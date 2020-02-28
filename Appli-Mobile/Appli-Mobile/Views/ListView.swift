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
    
    var post:Post = Post(title: "Wsh t'es charmante, ça te dirait une glace à la menthe",description:"On m'a dit ça l'autre jour dans la rue")
    
    var colors:[Color] = [Color(red:0.6,green:0.9,blue:0.94),Color(red:0.42,green:0.89,blue:0.95),Color(red:0.17,green:0.7,blue:0.76),Color(red:0.91,green:0.87,blue:0.07),Color(red:0.95,green:0.93,blue:0.26)]
    
    
    var body: some View {
        VStack{
            CategoriesView().padding(.bottom,-10)
            List(){
                ForEach(userDAO.users){person in
                    ZStack{
                        RowPostView(user:person,post:self.post).padding(.bottom)
                    
                        
                    }.listRowBackground(
                        VStack{
                            self.colors.randomElement()
                            Spacer()
                    })
                        .padding(.top)
                    
                    
                }
                
            }
        }
    }
}

struct ListView_Previews: PreviewProvider {
    static var previews: some View {
        ListView()
    }
}
