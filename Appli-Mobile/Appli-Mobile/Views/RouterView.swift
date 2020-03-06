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
    @State var currentUserEmail:String? = nil
    @State var currentUser:User? = nil
    @State var filter:FilterType? = nil
    
    
    
    
    var body: some View {
        NavigationView{
            VStack{
                
                ListView(posts:postDAO.posts,navigatePost: {
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
                                    self.afficherFilter=true
                                    self.afficherFilter=false
                                })
                            }
                            else if(result==2){
                                self.postDAO.addVote(vote: Vote(user:self.currentUserEmail!,post:post._id,like:res),post:post, completionHandler: {
                                    res in
                                })
                                self.postDAO.addVote(vote: Vote(user:self.currentUserEmail!,post:post._id,like:res),post:post, completionHandler: {
                                    res in
                                    // print(res)
                                    self.afficherFilter=true
                                    self.afficherFilter=false
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
                }).onAppear {self.isLogged = self.isConnected()
                    print("Longitude: \(self.userLongitude)")
                    print("Latitude: \(self.userLatitude)")
                        if(self.isLogged){
                            self.getCurrentUser()
                        }
                }
                
                
            }.navigationBarTitle(Text("How 2 React"),displayMode: .inline)
                .navigationBarItems(leading:
                    Button(action:{
                        withAnimation{
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
                            Text("CC").opacity(0)
                    }.background(Image("H2R").resizable()
                        .scaledToFit()
                        .frame(width: 30, height: 30))
                    ,trailing:
                    
                    HStack{
                        Button(action:{
                            self.afficherFilter = true
                            self.currentPost = nil
                            self.afficherLogin=false
                            self.afficherAdd = false
                            self.afficherMesPost = false
                            
                        }){
                            Image(systemName:"magnifyingglass")
                        }.foregroundColor(Color(red:0,green:0.8,blue:0.9))
                            .frame(width : 20, height: 20)
                        Spacer().frame(width: CGFloat(20))
                        Button(action:{
                            if(self.isLogged){
                                self.userDAO.findUser(email: self.currentUserEmail!, completionHandler: {
                                    user in
                                    self.currentUser = user[0]
                                    
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
                        }.foregroundColor(Color(red:0,green:0.8,blue:0.9))
                            .scaledToFit()
                            .frame(width: 30, height: 30)
                        
                        
                    }
            ).overlay((self.afficherLogin && !self.isLogged) ? LoginView(isAfficher: self.$afficherLogin,isAfficherRegister: self.$afficherRegister,isLogged:self.$isLogged, didLogged:{
                email,password in
                self.connectUser(email: email)
                self.getCurrentUser()
            }).edgesIgnoringSafeArea(.all) : nil)
                .overlay(self.afficherRegister ? RegisterView(isAfficher: self.$afficherRegister, isAfficherLogin: self.$afficherLogin, isLogged:self.$isLogged).edgesIgnoringSafeArea(.all) : nil)
                .overlay((self.afficherLogin && self.isLogged) ? ProfileView(/*isLogged:self.$afficherLogin,*/user: self.currentUser!,disconnect:{
                    res in
                    if(res){
                        self.disconnectUser()
                        self.isLogged = self.isConnected()
                    }
                }, displayMyPost:{
                    res in
                    if(res){
                        self.afficherMesPost = true
                    }
                }).edgesIgnoringSafeArea(.all) : nil)
                .overlay((self.isLogged && !self.afficherLogin && !self.afficherFilter) ? addButton(
                    isAfficher: {
                        afficher in
                        self.afficherAdd = afficher
                }
                    ): nil)
                .overlay(self.afficherFilter ? FilterView(afficherFilter: self.$afficherFilter,navigateFilter:{
                    res in
                    self.filter = res
                    if(self.filter != nil){
                        self.postDAO.filterAll(filter:self.filter!)
                    }
                    
                }).edgesIgnoringSafeArea(.all) : nil)
                
                
                .overlay(self.afficherMesPost ? MyPostView(navigatePost:{
                    res in
                    self.currentPost=res
                    self.afficherMesPost=false
                },navigateVote:{
                    res,post in
                },user : self.currentUserEmail!).edgesIgnoringSafeArea(.all) : nil)
                
                .overlay(self.afficherAdd ? AddPostView(currentPosition:[self.userLatitude,self.userLongitude],currentUser:self.currentUserEmail, afficherAdd: {
                    afficher in
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
