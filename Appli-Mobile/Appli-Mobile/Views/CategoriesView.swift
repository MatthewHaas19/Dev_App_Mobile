//
//  CategoriesView.swift
//  Appli-Mobile
//
//  Created by Luca Debeir on 26/02/2020.
//  Copyright © 2020 POLYTECH. All rights reserved.
//

import SwiftUI

struct CategoriesView: View {
    
    @Binding var isLogged:Bool
    
    var body: some View {

        
        VStack(alignment: .leading) {
            
            
            
            // Stories Circles
            ScrollView([.horizontal], showsIndicators: false){
                HStack {
                    
                    self.isLogged ? VStack {
                        ZStack(alignment: .bottomTrailing) {
                            Image("Border")
                            Image("Add")
                        }
                        Text("Add Post")
                            .font(Font.system(size: 13.5))
                    }.padding(.trailing, 12) : nil
                    
                    
                    VStack {
                        ZStack(alignment: .bottomTrailing) {
                            Image("Border")
                            Image("Add")
                        }
                        Text("All")
                            .font(Font.system(size: 13.5))
                    }.padding(.trailing, 12)
                    
                    
                    VStack {
                        ZStack {
                            Image("Border")
                            Image("AvatarBig1")
                        }
                        Text("Dans la rue")
                            .font(Font.system(size: 13.5))
                    }.padding(.trailing, 12)
                    
                    
                    VStack {
                        ZStack {
                            Image("Border")
                            Image("AvatarBig2")
                        }
                        Text("En soirée")
                            .font(Font.system(size: 13.5))
                    }.padding(.trailing, 12)
                   
                    
                    VStack {
                        ZStack {
                            Image("Border")
                            Image("AvatarBig3")
                        }
                        Text("Categorie3")
                            .font(Font.system(size: 13.5))
                    }.padding(.trailing, 12)
                    
                    VStack {
                        ZStack {
                            Image("Border")
                            Image("AvatarBig4")
                        }
                        Text("Categorie4")
                            .font(Font.system(size: 13.5))
                    }.padding(.trailing, 12)
                    
                    
                
                }.padding(.leading, 16)
            }.padding(.leading,1)
             .padding(.trailing, 1)

        }.padding(.top)
        .padding(.bottom)
        .background(Color(red:0.95,green:0.95,blue:0.95))
        
    }
}

