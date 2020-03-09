//
//  AddPostView.swift
//  Appli-Mobile
//
//  Created by Luca Debeir on 28/02/2020.
//  Copyright © 2020 POLYTECH. All rights reserved.
//

import SwiftUI
import TextView
import FirebaseStorage
import FirebaseFirestore

struct AddPostView: View {
    
    
    @State var emailUser:String=""
    @State var title:String = ""
    @State var description: String = ""
    @State var image: String? = nil
    @State var categorie = [String]()
    @State var isEditing = false
    
    
    
    lazy var imageView: UIImageView = {
        let iv = UIImageView()
        iv.contentMode = .scaleAspectFill
        iv.backgroundColor = .lightGray
        return iv
    }()

   

    @State var afficherImagePicker = false
    @State var imageInBlackBox = UIImage()
    @State var uploadImage = false


    var currentPosition:[String]?
    var currentUser : String?
    var afficherAdd : (Bool) -> ()
    
    let listCategorie = ["Amis","Couple","Ecole","Famille","Rue","Soiree","Sport","Transport","Travail","TV","Voisin","Web","Autres"]
    
    @State var listCategorieResult = [false,false,false,false,false,false,false,false,false,false,false,false,false]
    
    @State var isAnonyme = false
    
     @ObservedObject var postDAO = PostDAO()
    @ObservedObject private var keyboard = KeyboardResponder()
    
    init(currentPosition : [String]?,currentUser : String? , afficherAdd : @escaping (Bool) -> ()){
        self.currentUser = currentUser
        self.afficherAdd = afficherAdd
        self.currentPosition = currentPosition
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
                            .font(.custom("Noteworthy", size: 50))
                        .font(.largeTitle)
                        .fontWeight(.semibold)
                        .padding(.bottom, 40)
                        .padding(.top, 60)
                        
                        Spacer()
                    }
                
                    
                
                Toggle(isOn: self.$isAnonyme){
                    Text("Publier en Anonyme")
                }.padding(.top,20)
                
                
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
                            self.uploadImage = true
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
    
    var colors:[[Double]] = [
    [61/255,173/255,171/255],[27/255,159/255,156/255],[4/255,176/255,186/255],[84/255,188/255,194/255],[27/255,197/255,167/255],[232/255,231/255,18/255],[225/255,218/255,0/255],[240/255,212/255,11/255]
    ]
    
    
    func createPost() {
       
        var listCat = [String]()
        var i = 0
        for cat in self.listCategorieResult {
            if cat {
                listCat.append(listCategorie[i])
            }
            i=i+1
        }
        if(self.uploadImage){
            uploadPhoto(completion:{
                res in
                print("res")
                print(res)


                let post = PostPost(titre:self.title, texte:self.description,  nbSignalement:0, image:res, localisation:self.currentPosition, categorie:listCat, note:0, date:"", user:self.currentUser!, isAnonyme:self.isAnonyme, couleur: self.colors.randomElement()! )

                
                self.postDAO.addPost(post: post, completionHandler: {
                    res in
                    if(res){
                        self.afficherAdd(false)
                    }
                    else{
                        print("add post error")
                    }
                })
            })
        }
        else{
        

            let post = PostPost(titre:self.title, texte:self.description,  nbSignalement:0, image:nil, localisation:self.currentPosition, categorie:listCat, note:0, date:"", user:self.currentUser!, isAnonyme: self.isAnonyme, couleur: self.colors.randomElement()!)

                
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
    }
    
    func uploadPhoto(completion: @escaping (String)->()){
        let image = self.imageInBlackBox
        guard let data = image.jpegData(compressionQuality:1.0) else { return }
        
        let imageName = UUID().uuidString
        
        let imageReference = Storage.storage().reference()
            .child(MyKeys.imagesFolder)
            .child(imageName)
        
        imageReference.putData(data, metadata: nil){
            (metadata,err) in
            if let err = err {
                print(err)
                return
            }
            imageReference.downloadURL(completion: {(url,err) in
                if let err = err {
                    print(err)
                    return
                }
                
                guard let url = url else {
                    print("error")
                    return
                }
                
                let dataReference = Firestore.firestore().collection(MyKeys.imagesCollection).document()
                
                let documentUid = dataReference.documentID
                
                
                let urlString = url.absoluteString
                
                print("new url")
                print(urlString)
                completion(urlString)
                
                let data = [
                    MyKeys.uid: documentUid,
                    MyKeys.imageUrl: urlString,
                ]
                
                dataReference.setData(data, completion: {
                    (err) in
                    if let err = err {
                        print(err)
                        return
                    }
                    
                    UserDefaults.standard.set(documentUid, forKey: MyKeys.uid)

                    print("image added to database")
                    
                    
                })
                
            })
        }
        
    }
    
    func downloadPhoto(completion: @escaping (UIImage?)->()){
        
        guard let uid = UserDefaults.standard.value(forKey: MyKeys.uid) else{
            print("error")
            return
        }
        
        let query = Firestore.firestore().collection(MyKeys.imagesCollection).whereField(MyKeys.uid, isEqualTo: uid)
        
        query.getDocuments { (snapshot, err) in
            if let err = err {
                print(err)
                return
            }
            guard let snapshot = snapshot, let data = snapshot.documents.first?.data(), let urlString = data[MyKeys.imageUrl] as? String, let url = URL(string: urlString) else {
                print("err")
                return
            }
            print("url")
            print(url)
            
            URLSession.shared.dataTask(with: url, completionHandler: { (data, response, err) in
                if let err = err {
                    completion(nil)
                    return
                }
                guard let data = data else {
                    completion(nil)
                    return
                }
                
                guard let image = UIImage(data: data) else {
                    completion(nil)
                    return
                }
                completion(image)
                
            }).resume()
            
        }
        
        
    }
}

struct AddPostView_Previews: PreviewProvider {
    
    var afficherAdd = false
    
    static var previews: some View {
        AddPostView(currentPosition:nil,currentUser: "Tom",afficherAdd: {
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

struct MyKeys {
    static let imagesFolder = "imagesFolder"
    static let imagesCollection = "imagesCollection"
    static let uid = "uid"
    static let imageUrl = "imageUrl"
}
