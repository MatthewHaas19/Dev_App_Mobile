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
    
   

    
    @State var nom:String = ""
    @State var prenom:String = ""
    @State var email:String = ""
    @State var password:String = ""
    @State var password2:String = ""
    
    
    
    var body: some View {
        ZStack{
            Color.white
            VStack{
                
                // Form{
                Text("Création de compte")
                    .font(.largeTitle)
                    .fontWeight(.semibold)
                    .padding(.bottom, 20)
                
                TextField("Nom", text: $nom)
                .padding()
                .background(Color(red:0.95,green:0.95,blue:0.95))
                .cornerRadius(5.0)
                .padding(.bottom, 20)
                
                TextField("Prenom", text: $prenom)
                .padding()
                .background(Color(red:0.95,green:0.95,blue:0.95))
                .cornerRadius(5.0)
                .padding(.bottom, 20)
                
                TextField("Email", text: $email)
                    .padding()
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
                        self.isAfficher = false
                        self.isAfficherLogin = false
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
            
        }
    }
}


