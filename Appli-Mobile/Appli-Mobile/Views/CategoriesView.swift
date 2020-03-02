//
//  CategoriesView.swift
//  Appli-Mobile
//
//  Created by Luca Debeir on 26/02/2020.
//  Copyright © 2020 POLYTECH. All rights reserved.
//

import SwiftUI

struct CategoriesView: View {
    
    
    var body: some View {
        
        
        VStack(alignment: .leading) {
            
            
            
            // Stories Circles
            ScrollView([.horizontal], showsIndicators: false){
                HStack {
                    
                    
                    
                    HStack {
                        
                        VStack {
                            ZStack {
                                Image("Border2")
                                Image("All")
                                
                            }
                            Text("All")
                                .font(Font.system(size: 13.5))
                        }.padding(.trailing, 12)
                        
                        VStack {
                            ZStack {
                                Image("Border2")
                                Image("Amis")
                                
                            }
                            Text("Entre amis")
                                .font(Font.system(size: 13.5))
                        }.padding(.trailing, 12)
                        
                        
                        VStack {
                            ZStack {
                                Image("Border2")
                                Image("Couple")
                            }
                            Text("En couple")
                                .font(Font.system(size: 13.5))
                        }.padding(.trailing, 12)
                        
                        
                        VStack {
                            ZStack {
                                Image("Border2")
                                Image("Ecole")
                            }
                            Text("A l'école")
                                .font(Font.system(size: 13.5))
                        }.padding(.trailing, 12)
                        
                        VStack {
                            ZStack {
                                Image("Border2")
                                Image("Famille")
                            }
                            Text("En famille")
                                .font(Font.system(size: 13.5))
                        }.padding(.trailing, 12)
                        
                        
                    }
                    
                    HStack {
                        
                        VStack {
                            ZStack {
                                Image("Border2")
                                Image("Rue")
                            }
                            Text("Dans la rue")
                                .font(Font.system(size: 13.5))
                        }.padding(.trailing, 12)
                        
                        VStack {
                            ZStack {
                                Image("Border2")
                                Image("Soiree")
                            }
                            Text("En soirée")
                                .font(Font.system(size: 13.5))
                        }.padding(.trailing, CGFloat(12))
                        
                        VStack {
                            ZStack {
                                Image("Border2")
                                Image("Sport")
                            }
                            Text("Au sport")
                                .font(Font.system(size: 13.5))
                        }.padding(.trailing, 12)
                        
                        
                        VStack {
                            ZStack {
                                Image("Border2")
                                Image("Transport")
                            }
                            Text("Transports")
                                .font(Font.system(size: 13.5))
                        }.padding(.trailing, 12)
                        
                        VStack {
                            ZStack {
                                Image("Border2")
                                Image("Travail")
                            }
                            Text("Au travail")
                                .font(Font.system(size: 13.5))
                        }.padding(.trailing, 12)
                        
                        
                    }
                    
                    HStack{
                        VStack {
                            ZStack {
                                Image("Border2")
                                Image("TV")
                            }
                            Text("A la télé")
                                .font(Font.system(size: CGFloat(13.5)))
                        }.padding(.trailing, CGFloat(12))
                        
                        VStack {
                            ZStack {
                                Image("Border2")
                                Image("Voisin")
                                
                            }
                            Text("Entre voisins")
                                .font(Font.system(size: 13.5))
                        }.padding(.trailing, 12)
                        
                        VStack {
                            ZStack {
                                Image("Border2")
                                Image("Web")
                                
                            }
                            Text("Web")
                                .font(Font.system(size: 13.5))
                        }.padding(.trailing, 12)
                        
                        VStack {
                            ZStack {
                                Image("Border2")
                                Image("Autre")
                                
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

