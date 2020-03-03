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
    var user : User
    @State var colorButton = Color(red:0,green:0.8,blue:0.9)
    
    var disconnect: (Bool) -> ()
    var displayMyPost: (Bool) -> ()
    
    var body: some View {
        ZStack{
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
                    .font(.largeTitle)
                    .fontWeight(.semibold)
                Spacer().frame(height:50)
                
                
                Image(systemName:"person.crop.circle")
                    .resizable()
                    .aspectRatio(contentMode: .fill)
                    .frame(width: 150, height: 150)
                    
                    .clipped()
                    .foregroundColor(Color(red:0,green:0.8,blue:0.9))
                Spacer().frame(height:100)
                HStack{
                    Text("Pseudo : ")
                        .font(.title)
                        .fontWeight(.semibold)
                    
                    Text(String(user.username))
                        .font(.title)
                        .fontWeight(.semibold)
                }
                
                HStack{
                    Text("Mail : ")
                        .font(.title)
                        .fontWeight(.semibold)
                    
                    Text(String(user.email))
                        .font(.title)
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
      
    }
}

struct ProfileView_Previews: PreviewProvider {
    
    static var previews: some View {
        
        VStack{
            ProfileView(user:User(id: "1", email: "aa@mail.com", password: "mdp", username: "Juju", posts: nil),disconnect: {
                res in
                
            }, displayMyPost: {
                res in
            })
        }
        
    }
}
