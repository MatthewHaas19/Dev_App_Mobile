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
    

    var navigatePost: (Post) -> ()
    var navigateVote: (Bool,Post) -> ()
    //var post:Post = Post( id : "idid", titre: "Super uper ", texte: "il m'est arrivé ca c'est super horrible help me please il m'est arrivé ca c'est super horrible help me please il m'est arrivé ca c'est super horrible help me please ", nbSignalement: 4, image: nil, localisation: "Montpellier", categorie: [ "Dans la rue"], note: 156, commentaire: nil, date: "08/12",user:"mail")
    
    var colors:[Color] = [Color(red:0.6,green:0.9,blue:0.94),Color(red:0.42,green:0.89,blue:0.95),Color(red:0.17,green:0.7,blue:0.76),Color(red:0.91,green:0.87,blue:0.07),Color(red:0.95,green:0.93,blue:0.26)]
    
    
    var body: some View {
        
        VStack{
            
            CategoriesView(navigateCategorie:{
                categorie in
                if(categorie=="All"){
                    self.postDAO.loadData()
                }else{
                   self.postDAO.filter(cat:categorie)
                }
                
            }).padding(.bottom,CGFloat(-10))
            List(){
                ForEach(postDAO.posts){
                    p in
                    ZStack{
                        RowPostView(post:p,navigatePost:{
                            post in
                            self.navigatePost(post)
                        },afficherEntier:false,navigateVote:{
                            res,post in
                            self.navigateVote(res,post)
                        }).padding(.bottom)
                    
                        
                    }.listRowBackground(
                        VStack{
                            self.colors.randomElement()
                            Spacer()
                        })
                        .padding(.top)
                    
                    
                    }
                .buttonStyle(BorderlessButtonStyle())
            }
        }
    }

}


