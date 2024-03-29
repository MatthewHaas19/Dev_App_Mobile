//
//  LoginView.swift
//  Appli-Mobile
//
//  Created by Luca Debeir on 25/02/2020.
//  Copyright © 2020 POLYTECH. All rights reserved.
//

import SwiftUI
import BCrypt

struct LoginView: View {
    
    @Binding var isAfficher: Bool
    @Binding var isAfficherRegister: Bool
    @Binding var isLogged: Bool
    var didLogged: (String,String) -> ()
 
    
    
    
    
    @State var email:String = ""
    @State var password:String = ""
    

    @State var invalidCredentials = false
    @State var colorButton = Color(red:0,green:0.8,blue:0.9)
    
    @ObservedObject var userDAO = UserDAO()
    @ObservedObject private var keyboard = KeyboardResponder()
    

    
    var body: some View {
        ScrollView {
            
        ZStack{
            Color.white
            VStack{
                
                self.invalidCredentials ? Text("Email ou Mdp incorrect !").foregroundColor(Color.red).padding(.bottom, 20) : nil
                // Form{
                Text("Login")
                    .font(.largeTitle)
                    .fontWeight(.semibold)
                    .padding(.bottom, 20)
                
                Image("H2R")
                    .resizable()
                    .aspectRatio(contentMode: .fill)
                    .frame(width: 150, height: 150)
                    .clipped()
                    .cornerRadius(150)
                    .padding(.bottom, 75)
                
                TextField("Email", text: $email)
                    .padding()
                    .background(Color(red:0.95,green:0.95,blue:0.95))
                    .cornerRadius(5.0)
                    .padding(.bottom, 20)
                SecureField("Password", text: $password)
                    .padding()
                    .background(Color(red:0.95,green:0.95,blue:0.95))
                    .cornerRadius(5.0)
                    .padding(.bottom, 20)
                
                
                
                //  TextField("email",text:$email).autocapitalization(.none)
                //  SecureField("password",text:$password)
                
                
                // }
                Button(action:{
                    withAnimation{
                        self.login()
                    }
                }){
                    Text("LOGIN")
                        .font(.headline)
                        .foregroundColor(.white)
                        .padding()
                        .frame(width: 220, height: 60)
                        .background(self.colorButton)
                        .cornerRadius(15.0)
                }
                Button(action:{
                    self.isAfficher = false
                    self.isAfficherRegister = true
                }){
                    Text("S'enregistrer")
                }.padding(.top)
                .foregroundColor(Color(red:0,green:0.8,blue:0.9))
                .padding(.bottom, keyboard.currentHeight)
                .edgesIgnoringSafeArea(.bottom)
                .animation(.easeOut(duration: 0.16))
                
            }.padding()
            
            
        }
        }.background(Color(.white))
    }
    
    func login(){
        self.colorButton = Color(red:0.95,green:0.95,blue:0.95)
        userDAO.findUser(email:self.email,completionHandler : {
            user in
            self.colorButton = Color(red:0,green:0.8,blue:0.9)
            if(user.count == 0){
                print("No User")
                self.isLogged = false
                self.invalidCredentials = true
            }
            else{
                let result = try! BCrypt.Hash.verify(message: self.password , matches: user[0].password )
                print(result)
                if(result){
                    self.invalidCredentials = false
                    self.isAfficher = false
                    self.isLogged = true
                    self.didLogged(self.email,self.password)
                }
                else{
                    self.isLogged = false
                    self.invalidCredentials = true
                }
            }
        })
    }
    
}



final class KeyboardResponder: ObservableObject {
    private var notificationCenter: NotificationCenter
    @Published private(set) var currentHeight: CGFloat = 0

    init(center: NotificationCenter = .default) {
        notificationCenter = center
        notificationCenter.addObserver(self, selector: #selector(keyBoardWillShow(notification:)), name: UIResponder.keyboardWillShowNotification, object: nil)
        notificationCenter.addObserver(self, selector: #selector(keyBoardWillHide(notification:)), name: UIResponder.keyboardWillHideNotification, object: nil)
    }

    deinit {
        notificationCenter.removeObserver(self)
    }

    @objc func keyBoardWillShow(notification: Notification) {
        if let keyboardSize = (notification.userInfo?[UIResponder.keyboardFrameEndUserInfoKey] as? NSValue)?.cgRectValue {
            currentHeight = keyboardSize.height
        }
    }

    @objc func keyBoardWillHide(notification: Notification) {
        currentHeight = 0
    }
}





