//
//  NavigationView.swift
//  Appli-Mobile
//
//  Created by Luca Debeir on 28/02/2020.
//  Copyright © 2020 POLYTECH. All rights reserved.
//

import SwiftUI

struct RouterView: View {
    
    
    @State var afficherLogin = false
    @State var afficherRegister = false
    @State var afficherFilter = false
    @State var isLogged = false
    
    
    @State var currentPost : Post? = nil
    
    
    var body: some View {
        NavigationView{
            VStack{
            
                ListView(navigatePost: {
                    post in
                    self.currentPost = post
                })
                
            }.navigationBarTitle(Text("How 2 React"),displayMode: .inline)
                    .navigationBarItems(leading:
                       Button(action:{
                        withAnimation{
                            self.afficherLogin=false
                            self.afficherRegister=false
                            self.afficherFilter = false
                            self.currentPost = nil
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
                            }){
                                Image(systemName:"person.crop.circle")
                            }.foregroundColor(Color(red:0,green:0.8,blue:0.9))
                            
                        }
                ).overlay((self.afficherLogin && !self.isLogged) ? LoginView(isAfficher: self.$afficherLogin,isAfficherRegister: self.$afficherRegister,isLogged:self.$isLogged, didLogged:{
                    email,password in
                    print(email)
                }).edgesIgnoringSafeArea(.all) : nil)
                    .overlay(self.afficherRegister ? RegisterView(isAfficher: self.$afficherRegister, isAfficherLogin: self.$afficherLogin, isLogged:self.$isLogged).edgesIgnoringSafeArea(.all) : nil)
                    .overlay((self.afficherLogin && self.isLogged) ? ProfileView(isLogged:self.$afficherLogin).edgesIgnoringSafeArea(.all) : nil)
                    .overlay((self.isLogged && !self.afficherLogin && !self.afficherFilter) ? addButton() : nil)
                .overlay(self.afficherFilter ? FilterView(afficherFilter: self.$afficherFilter).edgesIgnoringSafeArea(.all) : nil)
                .overlay((self.currentPost != nil) ? PostDetailView(post: self.currentPost!).edgesIgnoringSafeArea(.all) : nil)
        }
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
