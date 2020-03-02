//
//  PostDetailView.swift
//  Appli-Mobile
//
//  Created by Luca Debeir on 28/02/2020.
//  Copyright © 2020 POLYTECH. All rights reserved.
//

import SwiftUI

struct PostDetailView: View {
    
   
    var post : Post
    var body: some View {
        ZStack{
            Color.white
        VStack{
        Text(post.titre)
        Text(post.texte)
        
   // A FAIRE QUAND ON AURA BIEN MIS LES COMMENTAIRE CORRESPONDANT AU POST DASN LA BDD
            /*    List(){
                ForEach(self.post.commentaire){p in
                    ZStack{
                        RowCommentView(comment: p).padding(.bottom)
                    }
                    
                    
                }
                .buttonStyle(BorderlessButtonStyle())
 
                
            }*/
        }
        }
    }
}
/*
struct PostDetailView_Previews: PreviewProvider {
    static var previews: some View {
        PostDetailView(post:Post(titre: "Super uper ", texte: "il m'est arrivé ca c'est super horrible help me please il m'est arrivé ca c'est super horrible help me please il m'est arrivé ca c'est super horrible help me please ", nbSignalement: 4, image: nil, localisation: "Montpellier", categorie: [Categorie(cat: "Dans la rue")], note: 156, commentaire: nil, date: Date(),user:nil))
    }
}*/
