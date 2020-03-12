//
//  ProfileView.swift
//  Appli-Mobile
//
//  Created by Luca Debeir on 26/02/2020.
//  Copyright © 2020 POLYTECH. All rights reserved.
//

import SwiftUI

struct ProfileView: View {
    //@Binding var isLogged: Bool
    @ObservedObject var userDAO = UserDAO()
    @ObservedObject var postDAO = PostDAO()
    @ObservedObject var voteDAO = VotesDAO()
    
    
    @State var posts : [Post]
    var navigatePost: (Post) -> ()
    var navigateVote: (Int,Post) -> ()
    var user : User
    
    let colors:[Color] = [Color(red:0.6,green:0.9,blue:0.94),Color(red:0.42,green:0.89,blue:0.95),Color(red:0.17,green:0.7,blue:0.76),Color(red:0.91,green:0.87,blue:0.07),Color(red:0.95,green:0.93,blue:0.26)]
    
    
    @State var colorButton = Color(red:0,green:0.8,blue:0.9)
    
    var disconnect: (Bool) -> ()
    
    @State private var showingAlert = false
    
    var body: some View {
        
        GeometryReader { geometry in
            Color(.white)
            ScrollView {
            VStack(alignment: .leading){
                
                HStack {
                    
                    Button(action: {self.showingAlert = true}){
                        Text("Editer")
                            .fontWeight(.bold)
                            .foregroundColor(Color(red:1/255,green:58/255,blue:103/255))
                        Spacer()
                    }.frame(width: 200)
                        .padding()
                        .alert(isPresented: self.$showingAlert) {
                            Alert(title: Text("Action invalide"), message: Text("Veuillez vous connecter depuis la version web pour modifier votre profil"), dismissButton: .default(Text("Ok")))
                    }
                    Spacer()
                    
                    Button(action:{
                        self.disconnect(true)
                    }){
                        Image(systemName:"power")
                            .resizable()
                            .aspectRatio(contentMode: .fill)
                            .frame(width: 25, height: 25)
                    }.foregroundColor(Color(red:1,green:0,blue:0))
                    
                    
                }.padding(.top,50)
                    
                
                HStack {
                    Spacer()
                    Text("Mon profil")
                        .font(.custom("Noteworthy", size: 45))
                        .foregroundColor(Color(red:1/255,green:58/255,blue:103/255))
                        .fontWeight(.semibold)
                        .padding(.leading, 10)
                    Spacer()
                }
                
                
                
                HStack{
                    VStack{
                        Image(systemName: "person.crop.circle.fill")
                            .resizable()
                            .frame(width: 90, height: 90)
                            .clipShape(Circle())
                            .shadow(radius: 3)
                            .foregroundColor(Color(red:1/255,green:58/255,blue:103/255))
                        
                        Text(self.user.username)
                            .foregroundColor(Color(red:1/255,green:58/255,blue:103/255))
                            .fontWeight(.semibold)
                    }.padding(.leading, 10)
                    
                    Spacer()
                    
                    VStack{
                        Text(String(self.posts.count))
                            .font(.system(size: 30))
                            .foregroundColor(Color(red:1/255,green:58/255,blue:103/255))
                            .fontWeight(.bold)
                        
                        Text("Posts")
                            .font(.system(size: 13))
                            .foregroundColor(Color(red:1/255,green:58/255,blue:103/255))
                    }.padding(.leading, 30)
                    
                    Spacer()
                    
                    
                    
                }.frame(height: 100)
                    .padding(.leading, 10)
                
                
                
                
                
                
                List() {
                    ForEach(0..<self.posts.count){
                        index in
                        
                        
                        
                        
                        ZStack{
                            RowPostView(user:self.userDAO.currentUser,post:self.posts[index],localisation: "",navigatePost:{
                                post in
                                self.navigatePost(post)
                            },afficherEntier:false,navigateVote:{
                                res,post in
                                
                                self.voteDAO.addVotes(vote: Vote(user:self.user.email,post:self.posts[index]._id,like:res), completionHandler: {
                                    result in
                                    if(result==1){
                                        self.postDAO.addVote(vote: Vote(user:self.user.email,post:self.posts[index]._id,like:res),post:post, completionHandler: {
                                            bool in
                                            //print(res)
                                            
                                            if(res){
                                                self.posts[index].note = self.posts[index].note + 1
                                            }else{
                                                self.posts[index].note = self.posts[index].note - 1
                                            }
                                            self.posts.append(Post(id : "idid" ,titre: "Super uper ", texte: "il m'est arrivé ca c'est super horrible help me please il m'est arrivé ca c'est super horrible help me please il m'est arrivé ca c'est super horrible help me please ", nbSignalement: 4, image: nil, localisation: ["Montpellier"], categorie: ["Dans la rue"], note: 156, date: "08/12",user:"mail", isAnonyme: true , couleur:[1.00,1.00,1.00]))
                                            self.posts.remove(at: self.posts.count-1)
                                            
                                        })
                                    }
                                    else if(result==2){
                                        self.postDAO.addVote(vote: Vote(user:self.user.email,post:self.posts[index]._id,like:res),post:post, completionHandler: {
                                            bool in
                                        })
                                        self.postDAO.addVote(vote: Vote(user:self.user.email,post:self.posts[index]._id,like:res),post:post, completionHandler: {
                                            bool in
                                            
                                            
                                            if(res){
                                                self.posts[index].note = self.posts[index].note + 2
                                            }else{
                                                self.posts[index].note = self.posts[index].note - 2
                                            }
                                            self.posts.append(Post(id : "idid" ,titre: "Super uper ", texte: "il m'est arrivé ca c'est super horrible help me please il m'est arrivé ca c'est super horrible help me please il m'est arrivé ca c'est super horrible help me please ", nbSignalement: 4, image: nil, localisation: ["Montpellier"], categorie: ["Dans la rue"], note: 156, date: "08/12",user:"mail", isAnonyme: true , couleur:[1.00,1.00,1.00]))
                                            self.posts.remove(at: self.posts.count-1)
                                            
                                        })
                                    }
                                })
                            }).padding(.bottom)
                            .onAppear {
                                self.userDAO.findUser(email: self.user.email, completionHandler: {
                                        res in
                                    })
                            }
                                
                            
                            
                        }
                        .listRowBackground(
                            VStack{
                               Color(red:self.posts[index].couleur[0],green:self.posts[index].couleur[1],blue:self.posts[index].couleur[2])
                                Spacer()
                        }.cornerRadius(10)
                                
                        )
                            .padding(.top)
                        
                        

                    }.onDelete {(indexSet) in self.deletePost(indexSet: indexSet) }
                    .buttonStyle(BorderlessButtonStyle())
                    
                }.frame(height : geometry.size.height / 1.5)
                    .padding(.top)
                
                
                
                
                
                
            }.padding()
                .padding(.top,40)
            
        }.background(Color(.white)).edgesIgnoringSafeArea(.all)

        
        }
    }
    
    
    
    
    func deletePost(indexSet : IndexSet){
        print("On veut supprimer : ")
        let p = posts[indexSet.first!]
        self.posts.remove(at: indexSet.first!)
        print(p)
        postDAO.delete(post : p , completionHandler: {
            res in
            if(res){
                print("bien supprimé")
            }
            else{
                print("delete post error")
            }
        })
        
    }
    
    
    
    
}







/*ZStack{
 Color.white
 VStack{
 
 HStack{
 Spacer().frame(width: 300)
 VStack{
 
 Button(action:{
 self.disconnect(true)
 }){
 Image(systemName:"power")
 .resizable()
 .aspectRatio(contentMode: .fill)
 .frame(width: 25, height: 25)
 }.foregroundColor(Color(red:1,green:0,blue:0))
 Text("Deconnexion")
 .font(.subheadline)
 .fontWeight(.semibold)
 .foregroundColor(Color.red)
 
 }
 
 
 }
 
 Spacer().frame(height: 610)
 }
 
 VStack{
 
 
 
 
 Spacer().frame(height :230)
 Text("Mon profil")
 .font(.custom("Noteworthy", size: 45))
 .fontWeight(.bold)
 Spacer().frame(height:50)
 
 
 Image(systemName:"person.crop.circle.fill")
 .resizable()
 .aspectRatio(contentMode: .fill)
 .frame(width: 150, height: 150)
 
 
 .clipped()
 .foregroundColor(Color(red:0,green:0.8,blue:0.9))
 Spacer().frame(height:100)
 
 
 VStack {
 Text("Mon Pseudo : ")
 .font(.custom("Noteworthy", size: 30))
 .fontWeight(.semibold)
 
 Text(String(user.username))
 .font(.custom("Noteworthy", size: 30))
 .fontWeight(.semibold)
 
 Text("Mon Email : ")
 .font(.custom("Noteworthy", size: 30))
 .fontWeight(.semibold)
 
 Text(String(user.email))
 .font(.custom("Noteworthy", size: 30))
 .fontWeight(.semibold)
 }
 
 
 
 
 
 
 Spacer().frame(height:100)
 Button(action:{
 withAnimation{
 self.displayMyPost(true)
 }
 }){
 Text("Mes posts")
 .font(.largeTitle)
 .foregroundColor(.white)
 .frame(width: 240, height: 90)
 .background(self.colorButton)
 .cornerRadius(15.0)
 
 
 }
 
 }
 .padding(.bottom,100)
 
 
 
 
 }
 
 }*/


//struct ProfileView_Previews: PreviewProvider {
//
//    static var previews: some View {
//
//        VStack{
//            ProfileView(user:User(id: "1", email: "aa@mail.com", password: "mdp", username: "Juju", posts: nil),disconnect: {
//                res in
//
//            }, displayMyPost: {
//                res in
//            }, posts:[])
//        }
//
//    }
//}
