//
//  FilterView.swift
//  Appli-Mobile
//
//  Created by Luca Debeir on 28/02/2020.
//  Copyright © 2020 POLYTECH. All rights reserved.
//

import SwiftUI



struct FilterView: View {
   @Binding var afficherFilter: Bool
    
    

    
    @State var tags = ["exemple"]
    @State var tag:String = ""
    @State private var localisation: Double = 60
    @State private var picked = "Plus recent"
    
    @ObservedObject private var keyboard = KeyboardResponder()
    
    var navigateFilter: (FilterType) -> ()
    
    lazy var imageView: UIImageView = {
        let iv = UIImageView()
        iv.contentMode = .scaleAspectFill
        iv.backgroundColor = .lightGray
        return iv
    }()
    
    var trie = ["Plus recent","Plus populaire"]
    
    let listCategorie = ["Amis","Couple","Ecole","Famille","Rue","Soiree","Sport","Transport","Travail","TV","Voisin","Web","Autres"]
    
    @State var listCategorieResult = [false,false,false,false,false,false,false,false,false,false,false,false,false]
    
    @State var toggleAll = false
    
    @State var toggleLocalisation = false
    
    var body: some View {
        ZStack{
            Color.white
            VStack{
                ScrollView{
                    HStack{
                        Spacer()
                        
                        Text("Filtrer les Posts")
                            .font(.custom("Noteworthy", size: 50))
                            .font(.largeTitle)
                            .fontWeight(.semibold)
                            .padding(.bottom, 40)
                            .padding(.top, 60)
                        
                        Spacer()
                    }.padding(.top,70)
                    
                    VStack{
                        Picker(selection: $picked, label:
                        Text("tri")) {
                            ForEach(0 ..< trie.count) { index in
                                Text(self.trie[index]).tag(self.trie[index])
                            }
                        }//.pickerStyle(.PopUpButtonPickerStyle)
                    }.pickerStyle(SegmentedPickerStyle())
                        .padding()
                        .padding(.bottom,40)
                    
                    
                    
                    HStack{
                        Spacer()
                        Text("Filtrer avec des tags")
                            .fontWeight(.semibold)
                            .foregroundColor(Color(red:0,green:0.8,blue:0.9))
                        Spacer()
                    }.padding(.bottom,30)

                    
                    HStack{
                        
                        TextField("Ajouter un tag : ", text: $tag)
                            .padding()
                            .padding(.trailing,20.0)
                            .background(Color(red:0.95,green:0.95,blue:0.95))
                            .cornerRadius(5.0)
                            .padding(.bottom, 20)
                            .padding(.top, 20)
                        Button(action:{
                            self.tags.append(self.tag)
                            self.tag = ""
                        }){
                            Image(systemName: "plus.square.fill")
                                .resizable()
                                .aspectRatio(contentMode: .fill)
                                .frame(width:50,height:50)
                                .foregroundColor(Color(red:0,green:0.8,blue:0.9))
                                .padding()
                        }
                    }.padding(.leading,20)
                        .padding(.trailing,20)
                    HStack{
                        ScrollView(.horizontal, showsIndicators: true) {
                            HStack{
                                ForEach(tags, id: \.self){tag in
                                    
                                    HStack {
                                        Text(tag)
                                        Button(action: {
                                            self.tags = self.tags.filter { $0 != tag }
                                        }) {
                                            Image(systemName: "xmark.circle")
                                        }
                                    }
                                    .padding()
                                    .foregroundColor(.white)
                                    .background(Color(red:0,green:0.8,blue:0.9))
                                    .cornerRadius(.infinity)
                                    .lineLimit(1)
                                }
                            }
                            
                        }.padding()
                            .background(Color(red:0.95,green:0.95,blue:0.95))
                            .cornerRadius(10)
                    }.padding(.trailing,20)
                        .padding(.leading,20)
                        .padding(.bottom,30)
                    VStack {
                        ZStack{
                            Text("Filtrer la distance")
                            .fontWeight(.semibold)
                            .padding()
                            .foregroundColor(Color(red:0,green:0.8,blue:0.9))
                        
                            Toggle(isOn: self.$toggleLocalisation){
                                Text("")
                            }
                        }
                        self.toggleLocalisation ?
                        VStack{
                            Slider(value: $localisation, in: 0...500, step: 1)
                            .foregroundColor(Color(red:0,green:0.8,blue:0.9))
                        Text("\(Int(localisation)) km")
                            } : nil
                    }.padding()
                        .padding(.bottom,30)
                    
                    
                    VStack{
                        Text("Filtrer les catégories")
                            .fontWeight(.semibold)
                            .padding()
                            .foregroundColor(Color(red:0,green:0.8,blue:0.9))
                        Button(action:{

                            self.toggleAction()
                        }
                        ){
                            Toggle(isOn: self.$toggleAll){
                                Text("All").foregroundColor(.black)
                            }
                        }
                        Toggle(isOn: self.$listCategorieResult[0]){
                            Text("Amis")
                        }
                        Toggle(isOn: self.$listCategorieResult[1]){
                            Text("Couple")
                        }
                        Toggle(isOn: self.$listCategorieResult[2]){
                            Text("Ecole")
                        }
                        Toggle(isOn: self.$listCategorieResult[3]){
                            Text("Famille")
                        }
                        Toggle(isOn: self.$listCategorieResult[4]){
                            Text("Rue")
                        }
                        Toggle(isOn: self.$listCategorieResult[5]){
                            Text("Soiree")
                        }
                        Toggle(isOn: self.$listCategorieResult[6]){
                            Text("Sport")
                        }
                        Toggle(isOn: self.$listCategorieResult[7]){
                            Text("Transport")
                        }
                    }.padding(.trailing)
                    .padding(.leading)
                    
                    VStack{
                        Toggle(isOn: self.$listCategorieResult[8]){
                            Text("Travail")
                        }
                        Toggle(isOn: self.$listCategorieResult[9]){
                            Text("TV")
                        }
                        Toggle(isOn: self.$listCategorieResult[10]){
                            Text("Voisin")
                        }
                        Toggle(isOn: self.$listCategorieResult[11]){
                            Text("Web")
                        }
                        Toggle(isOn: self.$listCategorieResult[12]){
                            Text("Autre")
                        }
                    }.padding(.trailing)
                        .padding(.leading)
                    
                    Spacer()
                    HStack {
                        Spacer()
                        Button(action:{
                            var listCat = [String]()
                            var i = 0
                            for cat in self.listCategorieResult {
                                if cat {
                                    listCat.append(self.listCategorie[i])
                                }
                                i=i+1
                            }
                            if(self.toggleLocalisation == false){
                                self.localisation = 99999
                            }
                            let filter = FilterType(type:self.picked,tags:self.tags,localisation:String(self.localisation),categories:listCat)
                                self.navigateFilter(filter)
                            self.afficherFilter = false

                        }){
                            Text("Filtrer les posts")
                                .font(.headline)
                                .foregroundColor(.white)
                                .padding()
                                .frame(width: 220, height: 60)
                                .background(Color(red:0,green:0.8,blue:0.9))
                                .cornerRadius(15.0)
                        }
                        Spacer()
                    }.padding(.bottom,50)
                }
            }.padding(.bottom, keyboard.currentHeight)
                .edgesIgnoringSafeArea(.bottom)
                .animation(.easeOut(duration: 0.16))
        }
    }
    
    func toggleAction() {
        if(self.toggleAll){
            self.listCategorieResult = [false,false,false,false,false,false,false,false,false,false,false,false,false]
        }
        else{
            self.listCategorieResult = [true,true,true,true,true,true,true,true,true,true,true,true,true]
        }
    }
}
/*
 struct FilterView_Previews: PreviewProvider {
 
 static var previews: some View {
 
 VStack{
 FilterView(navigateFilter: {
 res in
 })
 }
 
 }
 }
 */
