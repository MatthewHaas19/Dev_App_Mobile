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



=======
<<<<<<< HEAD



=======
    
    @Binding var isLogged:Bool
    
>>>>>>> parent of 11367791... Structuration du code en Views
>>>>>>> parent of c6ab7ec8... kk
    var body: some View {


        VStack(alignment: .leading) {


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


                    VStack {
                        ZStack {
                            Image("Border2")
                            Image("All")

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


                    VStack {
                        ZStack {
                            Image("Border2")
                            Image("Web")
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
                    }.padding(.trailing, 12)

                    VStack {
                        ZStack {
                            Image("Border2")
                            Image("Au sport")
                        }
                        Text("Sport")
                            .font(Font.system(size: 13.5))
                    }.padding(.trailing, 12)

                    VStack {
                        ZStack {
                            Image("Border2")
                            Image("Transport")
                        }
                        Text("Transport")
                            .font(Font.system(size: 13.5))
                    }.padding(.trailing, 12)

                    VStack {
                        ZStack {
                            Image("Border2")
                            Image("TV")
                        }
                        Text("A la Télé")
                            .font(Font.system(size: 13.5))
                    }.padding(.trailing, 12)

                    VStack {
                        ZStack {
                            Image("Border2")
                            Image("Voisin")
                        }
                        Text("Voisins")
                            .font(Font.system(size: 13.5))
                    }.padding(.trailing, 12)


                    VStack {
                        ZStack {
                            Image("Border2")
                            Image("Autre")
                        }
                        Text("Autres")
<<<<<<< HEAD
                            .font(Font.system(size:13.5))
                    }.padding(.trailing,12)
                    
=======
                            .font(Font.system(size: 13.5))
                    }.padding(.trailing, 12)



>>>>>>> parent of c6ab7ec8... kk
                }.padding(.leading, 16)
                
            }.padding(.leading,1)
             .padding(.trailing, 1)
            

        }.padding(.top)
        .padding(.bottom)
        .background(Color(red:0.95,green:0.95,blue:0.95))

    }
}
