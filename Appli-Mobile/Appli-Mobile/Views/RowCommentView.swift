//
//  RowPostView.swift
//  Appli-Mobile
//
//  Created by Luca Debeir on 23/02/2020.
//  Copyright © 2020 POLYTECH. All rights reserved.
//

import SwiftUI

struct RowCommentView: View {
    
    var comment : Comment
    
    var body: some View {
        VStack{
        ZStack{
            Color.pink.edgesIgnoringSafeArea(.all)
            HStack{
            VStack(alignment:.leading, spacing:5){
               
                Text(comment.titreCom).foregroundColor(Color.white)
                    .font(.system(size:25))
                Spacer().frame(height:10)
                Text(comment.texteCom).foregroundColor(Color.white)
            }
                VStack{
                    Button(action:{}){ Image(systemName:"chevron.up").foregroundColor(Color.white).font(.system(size:25,weight: .bold))
                    }
                    
                    Text(String(comment.voteCom)).foregroundColor(Color.white).font(.system(size:20));
                    Button(action:{print("cc")}){
                    Image(systemName:"chevron.down").foregroundColor(Color.white)
                    .font(.system(size:25,weight: .bold))
                
                    }
                }
            }
            
        }.frame(height:100)
    }
    }
}

struct RowCommentView_Previews: PreviewProvider {
    static var previews: some View {
        
        VStack{
        
            RowCommentView(comment: Comment(_id : "idcom", postId : "idpost" ,titreCom: "J'ai deja vecu ca", texteCom: "Je te conseille de prendre du recul sur la situation, et de te rapprocher de pro", voteCom: 13, dateCome: Date(), user: nil) )
            
        }
        
    }
}
