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
    
    
    @ObservedObject var commentDAO = CommentDAO(/*postId : post._id*/)
    
    
    
    var colors:[Color] = [Color(red:0.6,green:0.9,blue:0.94),Color(red:0.42,green:0.89,blue:0.95),Color(red:0.17,green:0.7,blue:0.76),Color(red:0.91,green:0.87,blue:0.07),Color(red:0.95,green:0.93,blue:0.26)]
    
    
    var body: some View {
        
        VStack{
            
            List(){
                Text("cc")
                ForEach(commentDAO.comments){
                    c in
                    ZStack{
                        RowCommentView(comment:c).padding(.bottom)
                    
                        
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


