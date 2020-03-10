//
//  RegisterView.swift
//  Appli-Mobile
//
//  Created by Luca Debeir on 26/02/2020.
//  Copyright © 2020 POLYTECH. All rights reserved.
//

import SwiftUI

import SwiftUI

struct RegisterView: View {
    
    @Binding var isAfficher: Bool
    @Binding var isAfficherLogin: Bool
    @Binding var isLogged:Bool
    
    @ObservedObject var userDAO = UserDAO()
    @ObservedObject private var keyboard = KeyboardResponder()
    
    
    @State var username:String = ""
    @State var email:String = ""
    @State var password:String = ""
    @State var password2:String = ""
    
    @State private var showingAlert = false
    @State var msgError:String = ""
    
    @State var invalidCredentials = false

    
    
    
    
    var body: some View {
        ZStack{
            Color.white
            VStack{
                
                // Form{
                Text("Création de compte")
                    .font(.largeTitle)
                    .fontWeight(.semibold)
                    .padding(.bottom, 20)
                
                self.invalidCredentials ? Text("Email déja affilié à un compte").foregroundColor(Color.red).padding(.bottom, 20) : nil
                
                TextField("Pseudo", text: $username)
                    .padding()
                    .background(Color(red:0.95,green:0.95,blue:0.95))
                    .cornerRadius(5.0)
                    .padding(.bottom, 20)
                
                
                TextField("Email", text: $email)
                    .padding()
                    .autocapitalization(.none)
                    .background(Color(red:0.95,green:0.95,blue:0.95))
                    .cornerRadius(5.0)
                    .padding(.bottom, 20)
                SecureField("Mot de passe", text: $password)
                    .padding()
                    .background(Color(red:0.95,green:0.95,blue:0.95))
                    .cornerRadius(5.0)
                    .padding(.bottom, 20)
                SecureField("Confirmation mot de passe", text: $password2)
                    .padding()
                    .background(Color(red:0.95,green:0.95,blue:0.95))
                    .cornerRadius(5.0)
                    .padding(.bottom, 20)
                
                
                
                //  TextField("email",text:$email).autocapitalization(.none)
                //  SecureField("password",text:$password)
                
                
                // }
                Button(action:{
                    withAnimation{
                        self.msgError = ""
                        if (self.username.count == 0) {
                            self.showingAlert = true
                            self.msgError = self.msgError + "\nVeuillez renseigner un pseudo. "
                        }
                        if (self.email.count == 0) {
                            self.showingAlert = true
                            self.msgError = self.msgError + "\nVeuillez renseigner un email. "
                        }
                        if (self.password.count == 0 || self.password2.count == 0 ) {
                            self.showingAlert = true
                            self.msgError = self.msgError + "\nVeuillez renseigner les deux champs de mot de passe. "
                        }
                        
                        if (self.password != self.password2) {
                            self.showingAlert = true
                            self.msgError = self.msgError + "\nVeuillez renseigner deux mots de passe identiques. "
                        }
                        
                        
                        if (self.showingAlert == false) {
                            self.Register()
                        }
                        
                    }
                }){
                    Text("Créer mon compte")
                        .font(.headline)
                        .foregroundColor(.white)
                        .padding()
                        .frame(width: 220, height: 60)
                        .background(Color(red:0,green:0.8,blue:0.9))
                        .cornerRadius(15.0)
                }
                .alert(isPresented: $showingAlert) {
                    Alert(title: Text("Format invalide"), message: Text(self.msgError), dismissButton: .default(Text("Ok")))
                }
                Button(action:{
                    withAnimation{
                        self.isAfficher = false
                        self.isAfficherLogin = true
                        
                    }
                }){
                    Text("Déja un compte?")
                }.padding(.top)
                    .foregroundColor(Color(red:0,green:0.8,blue:0.9))
            }.padding()
                .padding(.bottom, keyboard.currentHeight)
                .edgesIgnoringSafeArea(.bottom)
                .animation(.easeOut(duration: 0.16))
            
        }
    }
    
    
    func Register(){
        if(self.password==self.password2){
            let user = UserPost(email:self.email,password:self.password,username:self.username,posts:[])
            self.userDAO.findUser(email: self.email, completionHandler: {
                res in
                if(res.count == 0){
                    self.userDAO.addUser(user: user, completionHandler: {
                        res in
                        if(res){
                            self.isAfficher = false
                            self.isAfficherLogin = true
                            self.isLogged = false
                        }
                        else{
                            print("register error")
                        }
                    })
                }
                else {
                    self.invalidCredentials = true
                }
            })
            
        }
        
    }
    
}


