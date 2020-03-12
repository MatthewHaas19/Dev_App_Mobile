//
//  ListCommentView.swift
//  Appli-Mobile
//
//  Created by user165001 on 3/3/20.
//  Copyright © 2020 POLYTECH. All rights reserved.
//

import Foundation
import SwiftUI

struct ListCommentView: View {
    
    var post : Post
    var currentUser : String?
    @State var comments = [Comment]()
    @ObservedObject var commentDAO = CommentDAO()
    @ObservedObject var userDAO = UserDAO()
    
    
    
    //var colors:[Color] = [Color(red:0.6,green:0.9,blue:0.94),Color(red:0.42,green:0.89,blue:0.95),Color(red:0.17,green:0.7,blue:0.76),Color(red:0.91,green:0.87,blue:0.07),Color(red:0.95,green:0.93,blue:0.26)]
    
    
    var colors:[Color] = [Color(red:61/255,green:173/255,blue:171/255),Color(red:27/255,green:159/255,blue:156/255),Color(red:4/255,green:176/255,blue:186/255),Color(red:84/255,green:188/255,blue:194/255),Color(red:27/255,green:197/255,blue:167/255),Color(red:232/255,green:231/255,blue:18/255),Color(red:225/255,green:218/255,blue:0/255),Color(red:240/255,green:212/255,blue:11/255)]
    
    var body: some View {
        
        ZStack{
            if ( self.comments.count > 0 ) {
                
                ScrollView(){
                    ForEach(self.comments){
                        c in
                        ZStack{
                            
                            RowCommentView(user:self.userDAO.currentUser,comment:c, currentUser : self.currentUser).padding(.bottom)
                            .background(VStack{
                                    Color(red:self.post.couleur[0]+0.1, green:self.post.couleur[1]+0.1, blue:self.post.couleur[2]+0.1)
                            })
                            .cornerRadius(30)
                            .padding()
                                
                            
                            Spacer().frame(height:30)
                            
                        }
                        .onAppear {
                                self.userDAO.findUser(email: c.user, completionHandler: {
                                    res in
                                })
                        }
                        
                        
                    }
                    .buttonStyle(BorderlessButtonStyle())
                    /*
                    if (self.comments.count == 1) {
                        ZStack{
                            HStack{
                                Spacer()
                                Text(" ")
                                Spacer()
                            }
                            
                            
                        }.buttonStyle(BorderlessButtonStyle())
                            .frame(height:400)
                            .listRowBackground(
                                VStack{
                                    Color(red:self.post.couleur[0]+0.1, green:self.post.couleur[1]+0.1, blue:self.post.couleur[2]+0.1)
                            })
                            .background(Color(red:self.post.couleur[0]+0.1, green:self.post.couleur[1]+0.1, blue:self.post.couleur[2]+0.1))
                            .padding(.top,0)
                        
                        
                        
                    }
                    
                    if (self.comments.count == 2) {
                        ZStack{
                            HStack{
                                Spacer()
                                Text(" ")
                                Spacer()
                            }
                            
                            
                        }.buttonStyle(BorderlessButtonStyle())
                            .frame(height:200)
                            .listRowBackground(
                                VStack{
                                    Color(red:self.post.couleur[0]+0.1, green:self.post.couleur[1]+0.1, blue:self.post.couleur[2]+0.1)
                            })
                            .background(Color(red:self.post.couleur[0]+0.1, green:self.post.couleur[1]+0.1, blue:self.post.couleur[2]+0.1))
                            .padding(.top,0)
                        
                        
                        
                    }
                    */
                }
                
                
                
            }
            else {
                Spacer()
                VStack {
                    VStack {
                        Text("Pas encore de commentaire")
                        
                        Text("Ajoutez le votre !!")
                        
                    }.foregroundColor(.white)
                        .padding()
                    
                }.border(Color.white, width: 3)
                
                Spacer()
                
                
            }
            
        }.onAppear {
            self.commentDAO.loadData(postId: self.post._id, navigateComment:  {
                comments in
                self.comments = comments
            })
            
        }
    }
    
}


