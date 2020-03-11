//
//  ListView.swift
//  Appli-Mobile
//
//  Created by Luca Debeir on 28/02/2020.
//  Copyright © 2020 POLYTECH. All rights reserved.
//

import SwiftUI

struct ListView: View {
    
    @ObservedObject var userDAO = UserDAO()
    @ObservedObject var postDAO = PostDAO()
    
    var posts:[Post]
    var positions:[String]
    
    var currentUser:String?

    var navigatePost: (Post) -> ()
    var navigateVote: (Bool,Post) -> ()
    var navigateCategorie: (String) -> ()
    //var post:Post = Post( id : "idid", titre: "Super uper ", texte: "il m'est arrivé ca c'est super horrible help me please il m'est arrivé ca c'est super horrible help me please il m'est arrivé ca c'est super horrible help me please ", nbSignalement: 4, image: nil, localisation: "Montpellier", categorie: [ "Dans la rue"], note: 156, commentaire: nil, date: "08/12",user:"mail")
    
    //var colors:[Color] = [Color(red:0.6,green:0.9,blue:0.94),Color(red:0.42,green:0.89,blue:0.95),Color(red:0.17,green:0.7,blue:0.76),Color(red:0.91,green:0.87,blue:0.07),Color(red:0.95,green:0.93,blue:0.26)]
    
    //var colors:[Color] = [Color(red:61/255,green:173/255,blue:171/255),Color(red:27/255,green:159/255,blue:156/255),Color(red:4/255,green:176/255,blue:186/255),Color(red:84/255,green:188/255,blue:194/255),Color(red:27/255,green:197/255,blue:167/255),Color(red:232/255,green:231/255,blue:18/255),Color(red:225/255,green:218/255,blue:0/255),Color(red:240/255,green:212/255,blue:11/255)]
    
    
    var body: some View {
        
        VStack{
            
            CategoriesView(navigateCategorie:{
                categorie in
                self.navigateCategorie(categorie)
                
                
            }).padding(.bottom,CGFloat(-10))
            List(){
                ForEach(posts){
                    p in
                    ZStack{
                        RowPostView(user:self.userDAO.currentUser,currentUserEmail:self.currentUser,post:p,localisation:self.postDAO.getPosition(currentPosition: self.positions, postPosition: p.localisation),navigatePost:{
                            post in
                            self.navigatePost(post)
                        },afficherEntier:false,navigateVote:{
                            res,post in
                            self.navigateVote(res,post)
                        }).padding(.bottom)
                        
                        
                    }.listRowBackground(
                        VStack{
                            Color(red:p.couleur[0],green:p.couleur[1],blue:p.couleur[2])
                            
                            Spacer()
                    })
                        .padding(.top)
                    .onAppear {
                            self.userDAO.findUser(email: p.user, completionHandler: {
                                res in
                            })
                    }
                        
                    
                }
                .buttonStyle(BorderlessButtonStyle())
            }
        }
        
    }
    
}


