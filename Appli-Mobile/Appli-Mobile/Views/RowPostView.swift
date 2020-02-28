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
    var body: some View {
        ZStack{
            //Color.pink.edgesIgnoringSafeArea(.all)
            HStack{
            VStack(alignment:.leading, spacing:5){
                HStack{
                    Image(systemName:"location").foregroundColor(Color.white)
                        .font(.system(size:14))
                    Text("proche - 7min").foregroundColor(Color.white).font(.system(size:14))
                }
                
                Text(user.username).foregroundColor(Color.white)
                    .font(.system(size:25))
                Spacer().frame(height:10)
                Text(post.title).foregroundColor(Color.white)
            }
                VStack{
                    Button(action:{}){ Image(systemName:"chevron.up").foregroundColor(Color.white).font(.system(size:25,weight: .bold))
                    }
                    
                    Text("12").foregroundColor(Color.white).font(.system(size:20));
                    Button(action:{print("cc")}){
                    Image(systemName:"chevron.down").foregroundColor(Color.white)
                    .font(.system(size:25,weight: .bold))
                
                    }
                }
            }
        }
    }
}

struct RowPostView_Previews: PreviewProvider {
    static var previews: some View {
        
        VStack{
        
           RowPostView(user:User(id: "1", email: "a@a.fr", password: "a", username: "Juju", posts: []),post:Post(title: "Wsh t'es charmante, ça te dirait une glace à la menthe",description:"On m'a dit ça l'autre jour dans la rue"))
            RowPostView(user:User(id: "1", email: "a@a.fr", password: "a", username: "Juju", posts: []),post:Post(title: "Wsh t'es charmante, ça te dirait une glace à la menthe",description:"On m'a dit ça l'autre jour dans la rue"))
        }.frame(height:100)
        
    }
}
