//
//  NavigationView.swift
//  Appli-Mobile
//
//  Created by Luca Debeir on 28/02/2020.
//  Copyright © 2020 POLYTECH. All rights reserved.
//

import SwiftUI
import CoreData

struct RouterView: View {
    
    
    @State var afficherLogin = false
    @State var afficherRegister = false
    @State var afficherFilter = false
    @State var isLogged = false
    @State var afficherAdd = false
    @State var afficherMesPost = false
    
    
    @State var currentPost : Post? = nil
    
    @ObservedObject var userDAO = UserDAO()
    @ObservedObject var postDAO = PostDAO()
    @ObservedObject var voteDAO = VotesDAO()
    
    @ObservedObject var locationManager = LocationManager()
    var userLatitude: String {
        return "\(locationManager.lastLocation?.coordinate.latitude ?? 0)"
    }
    var userLongitude: String {
        return "\(locationManager.lastLocation?.coordinate.longitude ?? 0)"
    }
    
    
    @Environment(\.managedObjectContext) var managedObjectContext
    @FetchRequest(
        entity: CurrentUser.entity(),
        sortDescriptors: [NSSortDescriptor(keyPath: \CurrentUser.email, ascending: true)]
    ) var set: FetchedResults< CurrentUser >
    @State var currentUserEmail:String? 
    @State var currentUser:User? = nil
    @State var filter:FilterType? = nil
    
    
    
    
    var body: some View {
        NavigationView{
            VStack{
                
                ListView(posts:postDAO.posts,positions:postDAO.localisation,currentUser:self.currentUserEmail,navigatePost: {
                    post in
                    self.currentPost = post
                },navigateVote:{
                    res,post in
                    if(self.isLogged){
                        self.voteDAO.addVotes(vote: Vote(user:self.currentUserEmail!,post:post._id,like:res), completionHandler: {
                            result in
                            if(result==1){
                                self.postDAO.addVote(vote: Vote(user:self.currentUserEmail!,post:post._id,like:res),post:post, completionHandler: {
                                    res in
                                    //print(res)
                                    self.postDAO.loadData()
                                })
                            }
                            else if(result==2){
                                self.postDAO.addVote(vote: Vote(user:self.currentUserEmail!,post:post._id,like:res),post:post, completionHandler: {
                                    res in
                                })
                                self.postDAO.addVote(vote: Vote(user:self.currentUserEmail!,post:post._id,like:res),post:post, completionHandler: {
                                    res in
                                    // print(res)
                                    self.postDAO.loadData()
                                })
                            }
                        })
                    }},navigateCategorie:{
                        res in
                        if(res=="All"){
                            self.postDAO.loadData()
                        }else{
                            self.postDAO.filter(cat: res)
                        }
                }).onReceive(self.locationManager.$lastLocation, perform: {
                    location in
                    print(self.userLatitude)
                    DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) {
                        print(self.userLatitude)
                        self.postDAO.localisation = [self.userLatitude,self.userLongitude]
                    }
                    
                })
                    .onAppear {self.isLogged = self.isConnected()
                    //self.postDAO.addPosition(currentPosition: [self.userLatitude,self.userLongitude])
                        if(self.isLogged){
                            self.getCurrentUser()
                            self.postDAO.getMyPosts(email: self.currentUserEmail!)
                        }
                }
                
                
            }.navigationBarTitle(Text(""), displayMode: .inline)
                .navigationBarItems(leading:
                    HStack{
                    Button(action:{
                        withAnimation{
                            self.postDAO.loadData()
                            self.afficherLogin=false
                            self.afficherRegister=false
                            self.afficherFilter = false
                            self.afficherAdd = false
                            self.afficherMesPost = false
                            self.currentPost = nil
                            if (self.isLogged){
                                self.getCurrentUser()
                            }
                        }}){
                            Image("H2R").resizable()
                    }
                        .scaledToFit()
                        .frame(width: 30, height: 30)
                        .frame(width:30,height:30 )
        
                        
                        Button(action:{
                            withAnimation{
                                self.postDAO.loadData()
                                self.afficherLogin=false
                                self.afficherRegister=false
                                self.afficherFilter = false
                                self.afficherAdd = false
                                self.afficherMesPost = false
                                self.currentPost = nil
                                if (self.isLogged){
                                    self.getCurrentUser()
                                }
                            }}){
                                HStack{
                                    Text("How 2 React").font(.custom("Noteworthy", size: 25))
                                        .foregroundColor(.black)
                                        .fontWeight(.semibold)
                                }
                        }
                        
                        
                    }.padding(.bottom).padding(.top),trailing:
                    
                    HStack{
                        Button(action:{
                            self.afficherFilter = true
                            self.currentPost = nil
                            self.afficherLogin=false
                            self.afficherAdd = false
                            self.afficherMesPost = false
                            
                        }){
                            Image(systemName:"magnifyingglass")
                                .font(.title)
                        }.foregroundColor(Color(red:0,green:0.8,blue:0.9))

                            .frame(width : 20, height: 20)
                            
                        Spacer().frame(width: CGFloat(17))

                        Button(action:{
                            self.postDAO.loadData()
                            if(self.isLogged){
                                self.userDAO.findUser(email: self.currentUserEmail!, completionHandler: {
                                    user in
                                    self.currentUser = user[0]
                                    self.postDAO.getMyPosts(email: self.currentUserEmail!)
                                    self.afficherLogin.toggle()
                                    self.afficherRegister=false
                                    self.currentPost = nil
                                    self.afficherFilter = false
                                    self.afficherAdd = false
                                    self.afficherMesPost = false
                                })
                            }
                            else{
                                self.afficherLogin.toggle()
                                self.afficherRegister=false
                                self.currentPost = nil
                                self.afficherFilter = false
                                self.afficherAdd = false
                                self.afficherMesPost = false
                                self.disconnectUser()
                            }
                            
                        }){
                            Image(systemName:"person.crop.circle")
                            .font(.title)
                        }.foregroundColor(Color(red:0,green:0.8,blue:0.9))
                            .scaledToFit()
                            .frame(width: 40, height: 40)
                        
                        
                    }.padding(.bottom)
                        .padding(.top)
            ).overlay((self.afficherLogin && !self.isLogged) ? LoginView(isAfficher: self.$afficherLogin,isAfficherRegister: self.$afficherRegister,isLogged:self.$isLogged, didLogged:{
                email,password in
                self.connectUser(email: email)
                self.getCurrentUser()
            }).edgesIgnoringSafeArea(.all) : nil)
                .overlay(self.afficherRegister ? RegisterView(isAfficher: self.$afficherRegister, isAfficherLogin: self.$afficherLogin, isLogged:self.$isLogged).edgesIgnoringSafeArea(.all) : nil)
                
                .overlay((self.afficherLogin && self.isLogged) ? ProfileView(
                    posts:self.postDAO.myPost,positions:postDAO.localisation
                    ,navigatePost:{
                        res in
                        self.currentPost=res
                        self.afficherMesPost=false
                    },navigateVote:{
                        res,post in
                        self.postDAO.getMyPosts(email: self.currentUserEmail!)
                        self.afficherMesPost=false
                        self.afficherMesPost=true
                    },
                    user: self.currentUser!,
                    disconnect:{
                    res in
                    if(res){
                        self.disconnectUser()
                        self.isLogged = self.isConnected()
                    }
                }
                   ).edgesIgnoringSafeArea(.all) : nil)
                
                .overlay((self.isLogged && !self.afficherLogin && !self.afficherFilter) ? addButton(
                    isAfficher: {
                        afficher in
                        self.afficherAdd = afficher
                        print("Longitude: \(self.userLongitude)")
                        print("Latitude: \(self.userLatitude)")
                }
                    ): nil)
                .overlay(self.afficherFilter ? FilterView(afficherFilter: self.$afficherFilter,navigateFilter:{
                    res in
                    self.filter = res
                    if(self.filter != nil){
                        self.postDAO.filterAll(filter:self.filter!)
                    }
                    
                }).edgesIgnoringSafeArea(.all) : nil)
                
                
                .overlay(self.afficherMesPost ? MyPostView(posts:self.postDAO.myPost,navigatePost:{
                    res in
                    self.currentPost=res
                    self.afficherMesPost=false
                },navigateVote:{
                    res,post in
                    self.postDAO.getMyPosts(email: self.currentUserEmail!)
                    self.afficherMesPost=false
                    self.afficherMesPost=true
                },user : self.currentUserEmail!).edgesIgnoringSafeArea(.all) : nil)
                
                .overlay(self.afficherAdd ? AddPostView(currentPosition:[self.userLatitude,self.userLongitude],currentUser:self.currentUserEmail, afficherAdd: {
                    afficher in
                    self.postDAO.loadData()
                    self.postDAO.getMyPosts(email: self.currentUserEmail!)
                    self.afficherAdd=afficher
                }).edgesIgnoringSafeArea(.all) : nil)
            
            
            
            
        }.navigationViewStyle(StackNavigationViewStyle())
    }
    
    func connectUser(email:String){
        let currentUser = CurrentUser(context: self.managedObjectContext)
        currentUser.email = email
        do {
            try self.managedObjectContext.save()
        } catch {
            fatalError()
        }
    }
    
    func getCurrentUser(){
        self.currentUserEmail = set[0].email
        if self.currentUserEmail != nil {
             userDAO.setUserEmail(user:self.currentUserEmail!)
        }
        print(self.currentUserEmail!)
    }
    
    func disconnectUser(){
        
        for s in set{
            let person = s
            managedObjectContext.delete(person)
        }
        do {
            try self.managedObjectContext.save()
            self.currentUserEmail=nil
            self.isLogged=false
            userDAO.setUserEmail(user:"")
            
        } catch {
            fatalError()
        }
    }
    
    func isConnected() -> Bool{
        var res = false
        for s in set{
            let person = s
            if(person.email!.count>0){
                res = true
            }
        }
        return res
    }
    

    
}


struct addButton : View {
    
    var isAfficher : (Bool) -> ()
    
    var body: some View {
        
        VStack {
            Spacer()
            
            
            Button(action:{
                self.isAfficher(true)
            }){
                Image("BouttonPlus")
                    .resizable()
                    .aspectRatio(contentMode: .fill)
                    .frame(width: 100, height: 100)
                    .shadow(radius: 3)
            }
        }
    }
}

struct RouterView_Previews: PreviewProvider {
    static var previews: some View {
        RouterView()
    }
}
