//
//  AddPostView.swift
//  Appli-Mobile
//
//  Created by Luca Debeir on 28/02/2020.
//  Copyright © 2020 POLYTECH. All rights reserved.
//

import SwiftUI
import TextView

struct AddPostView: View {
    
    @State var emailUser:String=""
    @State var title:String = ""
    @State var input: String = ""
    @State var image: String? = nil
    @State var categorie = [String]()
    @State var isEditing = false
    
    var body: some View {
        
        ZStack {
            Color.white
            VStack{
                
                // Form{
                Text("Ajouter un post")
                    .font(.largeTitle)
                    .fontWeight(.semibold)
                    .padding(.bottom, 20)
                    .padding(.top, 40)
                
                Spacer()
                
                TextField("Titre : ", text: $title)
                .padding()
                .background(Color(red:0.95,green:0.95,blue:0.95))
                .cornerRadius(5.0)
                .padding(.bottom, 20)
                
                
                
                TextView(
                    text: $input,
                    isEditing: $isEditing,
                    placeholder: "Description : ",
                    placeholderHorizontalPadding: 15,
                    placeholderVerticalPadding: 10,
                    placeholderColor: Color(red:0.72,green:0.72,blue:0.72),
                    backgroundColor: UIColor(red:0.95,green:0.95,blue:0.95, alpha:1)
                    
                ).frame(height:200)
                
                    .cornerRadius(5.0)
                    .padding(.bottom,20)
                
                
                TextField("Description : ", text: $title)
                .padding()
                .background(Color(red:0.95,green:0.95,blue:0.95))
                .cornerRadius(5.0)
                .padding(.bottom, 20)
                
                
                TextField("Titre : ", text: $title)
                .padding()
                .background(Color(red:0.95,green:0.95,blue:0.95))
                .cornerRadius(5.0)
                .padding(.bottom, 20)
                
                
                TextField("Titre : ", text: $title)
                .padding()
                .background(Color(red:0.95,green:0.95,blue:0.95))
                .cornerRadius(5.0)
                .padding(.bottom, 20)
                
              
            }.padding()
        }.padding(.top, 40)
        
    }
}

struct AddPostView_Previews: PreviewProvider {
    static var previews: some View {
        AddPostView()
    }
}
