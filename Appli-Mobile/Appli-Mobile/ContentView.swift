//
//  ContentView.swift
//  Appli-Mobile
//
//  Created by user165001 on 2/17/20.
//  Copyright © 2020 POLYTECH. All rights reserved.
//

import SwiftUI
import Combine

struct ContentView: View {

    
    @ObservedObject var userDAO = UserDAO()
    
    @State var afficherLogin = false
    @State var afficherRegister = false
    @State var isLogged = false

    
    //var colors:[Color] = [Color(red:1.0,green:0.6,blue:0.6),Color(red:0.3,green:0.55,blue:0.55),Color(red:0.3,green:0.55,blue:0.3),Color(red:0.3,green:0.3,blue:0.55)]
    var colors:[Color] = [Color(red:0.6,green:0.9,blue:0.94),Color(red:0.42,green:0.89,blue:0.95),Color(red:0.17,green:0.7,blue:0.76),Color(red:0.91,green:0.87,blue:0.07),Color(red:0.95,green:0.93,blue:0.26)]
    
    
    
    var post:Post = Post(title: "Wsh t'es charmante, ça te dirait une glace à la menthe",description:"On m'a dit ça l'autre jour dans la rue")
    
    
    
<<<<<<< HEAD
>>>>>>> parent of 11367791... Structuration du code en Views
=======
    
>>>>>>> parent of 9d6a086a... Merge branch 'master' of https://github.com/MatthewHaas19/Dev_App_Mobile
=======
    @ObservedObject var userDAO = UserDAO()
    
    @State var afficherLogin = false
    @State var afficherRegister = false
    @State var isLogged = false

    
    //var colors:[Color] = [Color(red:1.0,green:0.6,blue:0.6),Color(red:0.3,green:0.55,blue:0.55),Color(red:0.3,green:0.55,blue:0.3),Color(red:0.3,green:0.3,blue:0.55)]
    var colors:[Color] = [Color(red:0.6,green:0.9,blue:0.94),Color(red:0.42,green:0.89,blue:0.95),Color(red:0.17,green:0.7,blue:0.76),Color(red:0.91,green:0.87,blue:0.07),Color(red:0.95,green:0.93,blue:0.26)]
    
    
    
    var post:Post = Post(title: "Wsh t'es charmante, ça te dirait une glace à la menthe",description:"On m'a dit ça l'autre jour dans la rue")
    
    
    
>>>>>>> parent of 11367791... Structuration du code en Views
    var body: some View {
        NavigationView{
            VStack{
                CategoriesView(isLogged:self.$isLogged).padding(.bottom,-10)
                List(){
                    ForEach(userDAO.users){person in
                        ZStack{
                            RowPostView(user:person,post:self.post).padding(.bottom)
                            NavigationLink(destination: RowUserView(person:person)){
                                
                                EmptyView()
                                
                            }.buttonStyle(PlainButtonStyle())
                            
                        }.listRowBackground(
                            VStack{
                                self.colors.randomElement()
                                Spacer()
                        })
                            .padding(.top)
                        
                        
                    }
            
                }
                
            }.navigationBarTitle(Text("How 2 React"),displayMode: .inline)
                .navigationBarItems(leading:
                   Button(action:{
                    withAnimation{
                        self.afficherLogin=false
                        self.afficherRegister=false
                    }}){
                    Text("CC").opacity(0)
                    }.background(Image("H2R").resizable()
                    .scaledToFit()
                        .frame(width: 30, height: 30))
                    ,trailing:
                    
                        HStack{
                        Button(action:{}){
                            Image(systemName:"magnifyingglass")
                        }.foregroundColor(Color(red:0,green:0.8,blue:0.9))
                        Spacer().frame(width: CGFloat(20))
                        Button(action:{
                            self.afficherLogin.toggle()
                            self.afficherRegister=false
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
            .overlay(addButton())
            
            
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


struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}

