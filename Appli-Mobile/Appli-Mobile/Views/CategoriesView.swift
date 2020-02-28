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

    var body: some View {


        VStack(alignment: .leading) {
      // Stories Circles
            ScrollView([.horizontal], showsIndicators: false){
                HStack {

                    VStack {
                        ZStack {
                            Image("Border2")
                            Image("Web")

                        }
                        Text("All")
                            .font(Font.system(size: 13.5))

                    }.padding(.trailing, 12)


                    VStack {
                        ZStack {
                            Image("Border2")
                            Image("Amis")

                    }.padding(.trailing, 12) : nil



                    VStack {
                        ZStack {
                            Image("Border2")
                            Image("All")

                        }
                        Text("Entre amis")
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

                        Text("Autres")

                            .font(Font.system(size:13.5))
                    }.padding(.trailing,12)

                            .font(Font.system(size: 13.5))
                    }.padding(.trailing, 12)



            Text("Categorie4")
                            .font(Font.system(size: 13.5))
                    }.padding(.trailing, 12)

                            .font(Font.system(size: 13.5))
                    }.padding(.trailing, 12)

                    VStack {
                        ZStack {
                            Image("Border2")
                            Image("AvatarBig1")
                        }

                        Text("Autres")
                            .font(Font.system(size:13.5))
                    }.padding(.trailing,12)


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
