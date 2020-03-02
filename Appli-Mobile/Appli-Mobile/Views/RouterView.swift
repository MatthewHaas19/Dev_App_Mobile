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
    
    
    @State var currentPost : Post? = nil
    @State var currentCategorie : String = "All"
    
    
    @Environment(\.managedObjectContext) var managedObjectContext
    @FetchRequest(
        entity: CurrentUser.entity(),
        sortDescriptors: [NSSortDescriptor(keyPath: \CurrentUser.email, ascending: true)]
    ) var set: FetchedResults< CurrentUser >
    @State var currentUser:String? = nil


    
    var body: some View {
        NavigationView{
            VStack{
                
                ListView(navigatePost: {
                    post in
                    self.currentPost = post
                } , navigateCategorie: {
                    categorie in
                    self.currentCategorie = categorie
                }).onAppear {self.isLogged = self.isConnected()}

                
            }.navigationBarTitle(Text("How 2 React"),displayMode: .inline)
                    .navigationBarItems(leading:
                       Button(action:{
                        withAnimation{
                            self.afficherLogin=false
                            self.afficherRegister=false
                            self.afficherFilter = false
                            self.currentCategorie = "All"
                            self.currentPost = nil
                            self.connectUser(email: "a@a.fr")
                            self.getCurrentUser()
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
                                
                            }){
                                Image(systemName:"magnifyingglass")
                            }.foregroundColor(Color(red:0,green:0.8,blue:0.9))
                            Spacer().frame(width: CGFloat(20))
                            Button(action:{
                                self.afficherLogin.toggle()
                                self.afficherRegister=false
                                self.currentPost = nil
                                self.afficherFilter = false
                                self.disconnectUser()
                                
                            }){
                                Image(systemName:"person.crop.circle")
                            }.foregroundColor(Color(red:0,green:0.8,blue:0.9))
                            
                        }
                ).overlay((self.afficherLogin && !self.isLogged) ? LoginView(isAfficher: self.$afficherLogin,isAfficherRegister: self.$afficherRegister,isLogged:self.$isLogged, didLogged:{
                    email,password in
                    self.connectUser(email: email)
                    self.getCurrentUser()
                }).edgesIgnoringSafeArea(.all) : nil)
                    .overlay(self.afficherRegister ? RegisterView(isAfficher: self.$afficherRegister, isAfficherLogin: self.$afficherLogin, isLogged:self.$isLogged).edgesIgnoringSafeArea(.all) : nil)
                .overlay((self.afficherLogin && self.isLogged) ? ProfileView(/*isLogged:self.$afficherLogin,*/user: User(id: "1", email: "aa@mail.com", password: "mdp", username: "Juju", posts: nil),disconnect:{
                    res in
                    if(res){
                        self.disconnectUser()
                        self.getCurrentUser()
                        self.isLogged = self.isConnected()
                    }
                }).edgesIgnoringSafeArea(.all) : nil)
                    .overlay((self.isLogged && !self.afficherLogin && !self.afficherFilter) ? addButton() : nil)
                .overlay(self.afficherFilter ? FilterView(afficherFilter: self.$afficherFilter).edgesIgnoringSafeArea(.all) : nil)
                .overlay((self.currentPost != nil) ? PostDetailView(post: self.currentPost!).edgesIgnoringSafeArea(.all) : nil)
                .overlay((self.currentCategorie != "All") && (!self.afficherLogin) && (!self.afficherFilter) ? ListByCategorie(nameCategorie:self.currentCategorie).edgesIgnoringSafeArea(.all) : nil )
        }
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
        self.currentUser = set[0].email
        print(self.currentUser!)
    }
    
    func disconnectUser(){
        
        for s in set{
            let person = s
            managedObjectContext.delete(person)
        }
        do {
            try self.managedObjectContext.save()
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
    
    var body: some View {
        
        VStack {
            Spacer()

            
            Button(action:{}){
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
