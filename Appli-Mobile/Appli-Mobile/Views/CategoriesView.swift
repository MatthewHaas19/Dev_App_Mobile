//
//  CategoriesView.swift
//  Appli-Mobile
//
//  Created by Luca Debeir on 26/02/2020.
//  Copyright © 2020 POLYTECH. All rights reserved.
//

import SwiftUI

struct CategoriesView: View {
    
    @State var afficherLogin = false
    @State var afficherRegister = false
    
    
    var navigateCategorie : (String) -> ()
    
    
    var body: some View {
        
        
        VStack(alignment: .leading) {
            
            
            
            // Stories Circles
            ScrollView([.horizontal], showsIndicators: false){
                HStack {
                    
                    
                    
                    HStack {
                        
                        VStack {
                            ZStack {
                                Image("Border2")
                                Button(action:{
                                    self.navigateCategorie("All")
                                }){
                                    Image("All")
                                }
                                
                            }
                            Text("All")
                                .font(Font.system(size: 13.5))
                        }.padding(.trailing, 12)
                        
                        VStack {
                            ZStack {
                                Image("Border2")
                                Button(action:{
                                    self.navigateCategorie("Amis")
                                }){
                                    Image("Amis")
                                }
                                
                            }
                            Text("Entre amis")
                                .font(Font.system(size: 13.5))
                        }.padding(.trailing, 12)
                        
                        
                        VStack {
                            ZStack {
                                Image("Border2")
                                Button(action:{
                                    self.navigateCategorie("Couple")
                                }){
                                    Image("Couple")
                                }
                            }
                            Text("En couple")
                                .font(Font.system(size: 13.5))
                        }.padding(.trailing, 12)
                        
                        
                        VStack {
                            ZStack {
                                Image("Border2")
                                Button(action:{
                                    self.navigateCategorie("Ecole")
                                }){
                                Image("Ecole")
                                }
                            }
                            Text("A l'école")
                                .font(Font.system(size: 13.5))
                        }.padding(.trailing, 12)
                        
                        VStack {
                            ZStack {
                                Image("Border2")
                                Button(action:{
                                    self.navigateCategorie("Famille")
                                }){
                                Image("Famille")
                                }
                            }
                            Text("En famille")
                                .font(Font.system(size: 13.5))
                        }.padding(.trailing, 12)
                        
                        
                    }
                    
                    HStack {
                        
                        VStack {
                            ZStack {
                                Image("Border2")
                                Button(action:{
                                    self.navigateCategorie("Rue")
                                }){
                                Image("Rue")
                                }
                            }
                            Text("Dans la rue")
                                .font(Font.system(size: 13.5))
                        }.padding(.trailing, 12)
                        
                        VStack {
                            ZStack {
                                Image("Border2")
                                Button(action:{
                                    self.navigateCategorie("Soiree")
                                }){
                                Image("Soiree")
                                }
                            }
                            Text("En soirée")
                                .font(Font.system(size: 13.5))
                        }.padding(.trailing, CGFloat(12))
                        
                        VStack {
                            ZStack {
                                Image("Border2")
                                Button(action:{
                                    self.navigateCategorie("Sport")
                                }){
                                Image("Sport")
                                }
                            }
                            Text("Au sport")
                                .font(Font.system(size: 13.5))
                        }.padding(.trailing, 12)
                        
                        
                        VStack {
                            ZStack {
                                Image("Border2")
                                Button(action:{
                                    self.navigateCategorie("Transport")
                                }){
                                Image("Transport")
                                }
                            }
                            Text("Transports")
                                .font(Font.system(size: 13.5))
                        }.padding(.trailing, 12)
                        
                        VStack {
                            ZStack {
                                Image("Border2")
                                Button(action:{
                                    self.navigateCategorie("Travail")
                                }){
                                Image("Travail")
                                }
                            }
                            Text("Au travail")
                                .font(Font.system(size: 13.5))
                        }.padding(.trailing, 12)
                        
                        
                    }
                    
                    HStack{
                        VStack {
                            ZStack {
                                Image("Border2")
                                Button(action:{
                                    self.navigateCategorie("TV")
                                }){
                                Image("TV")
                                }
                            }
                            Text("A la télé")
                                .font(Font.system(size: CGFloat(13.5)))
                        }.padding(.trailing, CGFloat(12))
                        
                        VStack {
                            ZStack {
                                Image("Border2")
                                Button(action:{
                                    self.navigateCategorie("Voisin")
                                }){
                                Image("Voisin")
                                }
                                
                            }
                            Text("Entre voisins")
                                .font(Font.system(size: 13.5))
                        }.padding(.trailing, 12)
                        
                        VStack {
                            ZStack {
                                Image("Border2")
                                Button(action:{
                                    self.navigateCategorie("Web")
                                }){
                                Image("Web")
                                }
                                
                            }
                            Text("Web")
                                .font(Font.system(size: 13.5))
                        }.padding(.trailing, 12)
                        
                        VStack {
                            ZStack {
                                Image("Border2")
                                Button(action:{
                                    self.navigateCategorie("Autre")
                                }){
                                Image("Autre")
                                }
                                
                            }
                            Text("Autres")
                                .font(Font.system(size: 13.5))
                        }.padding(.trailing, 12)
                        
                        
                    }

                    
                    
                }.padding(.leading, 16)
            }.padding(.leading,1)
                .padding(.trailing, 1)
            
        }.padding(.top)
            .padding(.bottom)
            .background(Color(red:0.95,green:0.95,blue:0.95))
        
    }
}

