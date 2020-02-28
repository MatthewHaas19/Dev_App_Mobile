//
//  RowPostView.swift
//  Appli-Mobile
//
//  Created by Luca Debeir on 23/02/2020.
//  Copyright © 2020 POLYTECH. All rights reserved.
//

import SwiftUI

struct RowPostView: View {
    var user: User
    var post: Post
    
    var navigatePost: (Post) -> ()
    
    var body: some View {
        VStack{
        ZStack{
            //Color.pink.edgesIgnoringSafeArea(.all)
            HStack{
                Button(action:{
                    self.navigatePost(self.post)
                }){
            VStack(alignment:.leading, spacing:5){
                HStack{
                    Image(systemName:"location").foregroundColor(Color.white)
                        .font(.system(size:14))
                    Text(String(post.localisation)).foregroundColor(Color.white).font(.system(size:14))
                }
                
                Text(post.titre).foregroundColor(Color.white)
                    .font(.system(size:25))
                Spacer().frame(height:10)
                Text(post.texte).foregroundColor(Color.white)
            }
                }
                VStack{
                    Button(action:{}){ Image(systemName:"chevron.up").foregroundColor(Color.white).font(.system(size:25,weight: .bold))
                    }
                    
                    Text(String(post.note)).foregroundColor(Color.white).font(.system(size:20));
                    Button(action:{print("cc")}){
                    Image(systemName:"chevron.down").foregroundColor(Color.white)
                    .font(.system(size:25,weight: .bold))
                
                    }
                }
            }.frame(height:100)
        }.frame(height:100)
    }
    }
}

struct RowPostView_Previews: PreviewProvider {
    static var previews: some View {
        
        VStack{
        
            RowPostView(user:User(id: "1", email: "a@a.fr", password: "a", username: "Juju", posts: []),post:Post(titre: "Super uper ", texte: "il m'est arrivé ca c'est super horrible help me please il m'est arrivé ca c'est super horrible help me please il m'est arrivé ca c'est super horrible help me please ", nbSignalement: 4, image: nil, localisation: "Montpellier", categorie: [Categorie(cat: "Dans la rue")], note: 156, commentaire: nil, date: Date(),user:nil),navigatePost: {post in})
            
        }
        
    }
}
