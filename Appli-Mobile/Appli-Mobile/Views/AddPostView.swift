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
    @State var description: String = ""
    @State var image: String? = nil
    @State var categorie = [String]()
    @State var isEditing = false
    

    var afficherAdd : (Bool) -> ()

    @State var afficherImagePicker = false
    @State var imageInBlackBox = UIImage()

    
    var currentUser : String?
    
    let listCategorie = ["Amis","Couple","Ecole","Famille","Rue","Soiree","Sport","Transport","Travail","TV","Voisin","Web","Autres"]
    
    @State var listCategorieResult = [false,false,false,false,false,false,false,false,false,false,false,false,false]
    
     @ObservedObject var postDAO = PostDAO()
    @ObservedObject private var keyboard = KeyboardResponder()
    
    init(currentUser : String? , afficherAdd : @escaping (Bool) -> ()){
        self.currentUser = currentUser
        self.afficherAdd = afficherAdd
        UITableView.appearance().separatorColor = .clear
    }
    
    
    
    var body: some View {
        
        ZStack {
            Color.white
            VStack{
                Form{
                
                // Form{
                    HStack{
                        
                        Spacer()
                        
                        Text("Ajouter un post")
                        .font(.largeTitle)
                        .fontWeight(.semibold)
                        .padding(.bottom, 40)
                        .padding(.top, 60)
                        
                        Spacer()
                    }
                
                    
                

                
                TextField("Titre : ", text: $title)
                .padding()
                .background(Color(red:0.95,green:0.95,blue:0.95))
                .cornerRadius(5.0)
                .padding(.bottom, 20)
                .padding(.top, 20)
                
                
                
                TextView(
                    text: $description,
                    isEditing: $isEditing,
                    placeholder: "Description : ",
                    placeholderHorizontalPadding: 15,
                    placeholderVerticalPadding: 10,
                    placeholderColor: Color(red:0.72,green:0.72,blue:0.72),
                    backgroundColor: UIColor(red:0.95,green:0.95,blue:0.95, alpha:1)
                    
                ).frame(height:200)
                    .cornerRadius(5.0)
                    .padding(.bottom,20)
                    .padding(.top, 20)

                    HStack{
                        Spacer()
                        Image(uiImage: imageInBlackBox)
                        .resizable()
                        .scaledToFill()
                            .frame(width : 100, height : 100)
                            .border(Color.blue, width: 1)
                            .clipped()
                        Spacer()
                        Button(action:{
                            self.afficherImagePicker.toggle()
                            }){
                                Text("Ajouter une image")
                            }.padding(.top,20)
                            .padding(.bottom,20)
                                .foregroundColor(Color(red:0,green:0.8,blue:0.9))
                            .sheet(isPresented: $afficherImagePicker, content: {
                                ImagePickerView(isPresented : self.$afficherImagePicker, selectedImage: self.$imageInBlackBox)
                            })
                        Spacer()
                    }
                    
                    
                    
                    
                    //Catégories
                    VStack{
                        Text("Séléctionnez les catégories")
                            .fontWeight(.semibold)
                            .padding()
                            
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
                    }
                    
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
                    }
                    

              Spacer()
                    HStack {
                        Spacer()
                        Button(action:{
                            withAnimation{
                                self.createPost()
                            }
                        }){
                            Text("Ajouter le post")
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
  
            }.padding()
            
            
 
        }.padding(.bottom, keyboard.currentHeight)
        .edgesIgnoringSafeArea(.bottom)
        .animation(.easeOut(duration: 0.16))
        
    }
    
    func createPost() {
       
        var listCat = [String]()
        var i = 0
        for cat in self.listCategorieResult {
            if cat {
                listCat.append(listCategorie[i])
            }
            i=i+1
        }
        
        let post = PostPost(titre:self.title, texte:self.description,  nbSignalement:0, image:nil, localisation:nil, categorie:listCat, note:0, date:"", user:self.currentUser!)
            
            self.postDAO.addPost(post: post, completionHandler: {
                res in
                if(res){
                    self.afficherAdd(false)
                }
                else{
                    print("add post error")
                }
            })
        
    }
    /*
    func uploadPhoto(){
        guard let image = self.imageInBlackBox, let data = image.jpegData(compressionQuality:1.0) else{
            presentAlert(title:"Error",message:"something went wront")
            return
        }
    }*/
}

struct AddPostView_Previews: PreviewProvider {
    
    var afficherAdd = false
    
    static var previews: some View {
        AddPostView(currentUser: "Tom",afficherAdd: {
            afficher in

        })
    }
}

struct ImagePickerView: UIViewControllerRepresentable {
    
    @Binding var isPresented : Bool
    @Binding var selectedImage : UIImage
    
    func makeUIViewController(context: UIViewControllerRepresentableContext<ImagePickerView>) -> UIViewController {
        let controller = UIImagePickerController()
        controller.delegate = context.coordinator
        return controller
    }
    
    func makeCoordinator() -> ImagePickerView.Coordinator {
        return Coordinator(parent:self)
    }
    
    class Coordinator : NSObject, UIImagePickerControllerDelegate,UINavigationControllerDelegate {
        let parent : ImagePickerView
        
        init(parent : ImagePickerView){
            self.parent = parent
        }
        func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
            if let selectedImageFromPicker = info[.originalImage] as? UIImage {
                print(selectedImageFromPicker)
                self.parent.selectedImage = selectedImageFromPicker
            }
            self.parent.isPresented = false
        }
    }
    
    func updateUIViewController(_ uiViewController: ImagePickerView.UIViewControllerType, context: UIViewControllerRepresentableContext<ImagePickerView>) {
        
    }
}
