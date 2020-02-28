//
//  CategoriesView.swift
//  Appli-Mobile
//
//  Created by Luca Debeir on 26/02/2020.
//  Copyright © 2020 POLYTECH. All rights reserved.
//

import SwiftUI

struct CategoriesView: View {
<<<<<<< HEAD
<<<<<<< HEAD



=======
<<<<<<< HEAD



=======
    
    @Binding var isLogged:Bool
    
>>>>>>> parent of 11367791... Structuration du code en Views
>>>>>>> parent of c6ab7ec8... kk
=======
    
    
>>>>>>> parent of 9d6a086a... Merge branch 'master' of https://github.com/MatthewHaas19/Dev_App_Mobile
    var body: some View {

        
        VStack(alignment: .leading) {
<<<<<<< HEAD


<<<<<<< HEAD
            // Stories Circles
            ScrollView([.horizontal], showsIndicators: false){
                HStack {
=======

            // Stories Circles
            ScrollView([.horizontal], showsIndicators: false){
                HStack {
<<<<<<< HEAD
>>>>>>> parent of c6ab7ec8... kk


=======
            
            
            
            // Stories Circles
            ScrollView([.horizontal], showsIndicators: false){
                HStack {
                    
                    
>>>>>>> parent of 9d6a086a... Merge branch 'master' of https://github.com/MatthewHaas19/Dev_App_Mobile
                    VStack {
                        ZStack {
                            Image("Border2")
                            Image("Web")

                        }
                        Text("All")
                            .font(Font.system(size: 13.5))
<<<<<<< HEAD
                    }.padding(.trailing, 12)


                    VStack {
                        ZStack {
                            Image("Border2")
                            Image("Amis")
=======
                    }.padding(.trailing, 12) : nil
                    
                    
>>>>>>> parent of 11367791... Structuration du code en Views
                    VStack {
                        ZStack {
                            Image("Border2")
                            Image("All")
>>>>>>> parent of c6ab7ec8... kk

                        }
                        Text("Entre amis")
                            .font(Font.system(size: 13.5))
                    }.padding(.trailing, 12)
<<<<<<< HEAD


                    VStack {
                        ZStack {
                            Image("Border2")
<<<<<<< HEAD
=======
                            Image("Amis")

                        }
                        Text("Entre amis")
                            .font(Font.system(size: 13.5))
                    }.padding(.trailing, 12)


                    VStack {
                        ZStack {
                            Image("Border2")
>>>>>>> parent of c6ab7ec8... kk
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
                        Text("En cours")
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


=======
                    
                    
>>>>>>> parent of 9d6a086a... Merge branch 'master' of https://github.com/MatthewHaas19/Dev_App_Mobile
                    VStack {
                        ZStack {
                            Image("Border2")
                            Image("Web")
<<<<<<< HEAD
                        }
                        Text("Sur internet")
                            .font(Font.system(size: 13.5))
                    }.padding(.trailing, 12)
<<<<<<< HEAD


=======


>>>>>>> parent of c6ab7ec8... kk
                    VStack {
                        ZStack {
                            Image("Border2")
                            Image("Rue")
=======

>>>>>>> parent of 9d6a086a... Merge branch 'master' of https://github.com/MatthewHaas19/Dev_App_Mobile
                        }
                        Text("Dans la rue")
                            .font(Font.system(size: 13.5))
                    }.padding(.trailing, 12)
                    
                    
                    VStack {
                        ZStack {
                            Image("Border2")
                            Image("AvatarBig1")
                        }
                        Text("En soirée")
                            .font(Font.system(size: 13.5))
                    }.padding(.trailing, 12)
                   
                    
                    VStack {
                        ZStack {
                            Image("Border2")
                            Image("AvatarBig1")
                        }
                        Text("Categorie3")
                            .font(Font.system(size: 13.5))
                    }.padding(.trailing, 12)
                    
                    VStack {
                        ZStack {
                            Image("Border2")
                            Image("AvatarBig1")
                        }
<<<<<<< HEAD
                        Text("Autres")
<<<<<<< HEAD
                            .font(Font.system(size:13.5))
                    }.padding(.trailing,12)
                    
=======
                            .font(Font.system(size: 13.5))
                    }.padding(.trailing, 12)



>>>>>>> parent of c6ab7ec8... kk
=======
                        Text("Categorie4")
                            .font(Font.system(size: 13.5))
                    }.padding(.trailing, 12)
                    
                    
                
>>>>>>> parent of 9d6a086a... Merge branch 'master' of https://github.com/MatthewHaas19/Dev_App_Mobile
                }.padding(.leading, 16)
                
            }.padding(.leading,1)
             .padding(.trailing, 1)
            

        }.padding(.top)
        .padding(.bottom)
        .background(Color(red:0.95,green:0.95,blue:0.95))
        
    }
}

