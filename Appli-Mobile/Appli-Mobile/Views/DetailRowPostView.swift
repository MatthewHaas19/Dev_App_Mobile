//
//  RowPostView.swift
//  Appli-Mobile
//
//  Created by Luca Debeir on 23/02/2020.
//  Copyright © 2020 POLYTECH. All rights reserved.
//

import SwiftUI
import FirebaseStorage
import FirebaseFirestore

struct DetailRowPostView: View {
    
    @ObservedObject var userDAO = UserDAO()
    
    var currentUserEmail : String?
    var user:[User]?
    var post: Post
    @State var username : String=""
    
    var position: String
    @State var image: UIImage? = nil
    
    var navigatePost: (Post) -> ()
    
    var afficherEntier: Bool
    
    var navigateVote: (Bool,Post) -> ()
    
    var body: some View {
        VStack{
            ZStack{
                //Color.pink.edgesIgnoringSafeArea(.all)
                HStack{
                    Button(action:{
                        //self.navigatePost(self.post)
                        
                    }){
                        VStack(alignment:.leading, spacing:5){
                            HStack{
                                Image(systemName:"person.crop.circle").foregroundColor(Color.white)
                                    .font(.system(size:14))
                                if(post.isAnonyme == false ) {
                                    if(self.username.count>0){ Text(String(self.username)).foregroundColor(Color.white).font(.system(size:14))
                                    }
                                } else {
                                    Text("Anonyme").foregroundColor(Color.white).font(.system(size:14))
                                    
                                }
                                
                                Spacer()
                                Image(systemName:"location").foregroundColor(Color.white)
                                    .font(.system(size:14))
                                Text(self.position).foregroundColor(Color.white).font(.system(size:14))
                                
                            }
                            .onAppear {
                                self.userDAO.findUser(email: self.post.user, completionHandler: {
                                    res in
                                    self.username = res[0].username
                                })
                            }
                            
                            Text(post.titre).foregroundColor(Color.white)
                                .font(.system(size:25))
                            if(image == nil){
                                Spacer().frame(height:10)
                            }
                            
                            
                            
                            if(image != nil){
                                HStack{ Text(post.texte).foregroundColor(Color.white)
                                    
                                    
                                    Image(uiImage:image!)
                                        .renderingMode(.original)
                                        .resizable()
                                        .aspectRatio(contentMode: .fill)
                                        .frame(width: 60, height: 60)
                                        .clipped()
                                        .cornerRadius(20)
                                    
                                }.padding(.bottom, 20)
                            }else
                            {
                                Text(post.texte).foregroundColor(Color.white)
                            }
                            
                            
                            
                            
                            
                            
                        }.padding(.leading)
                        
                        Spacer()
                    }
                    
                    
                    VStack{
                        Button(action:{
                            self.navigateVote(true,self.post)
                        }){ Image(systemName:"chevron.up").foregroundColor(Color.white).font(.system(size:25,weight: .bold))
                        }
                        
                        Text(String(post.note)).foregroundColor(Color.white).font(.system(size:20));
                        Button(action:{
                            self.navigateVote(false,self.post)
                            
                        }){
                            Image(systemName:"chevron.down").foregroundColor(Color.white)
                                .font(.system(size:25,weight: .bold))
                            
                        }
                    }.padding(.trailing)
                }.frame(height:getHeight())
            }.fixedSize(horizontal : false, vertical : true)
        }
        
        
        
    }
    
    
    func getHeight() -> CGFloat?{
        if(self.afficherEntier){
            return nil
        }
        else{
            return CGFloat(100)
        }
    }
    
    
    
    
    func downloadImage(completion: @escaping (UIImage?) -> ()){
        
        guard let url = URL(string: self.post.image!) else {
            print("err")
            return
        }
        
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
/*
 struct DetailRowPostView_Previews: PreviewProvider {
 static var previews: some View {
 
 VStack{
 
 DetailRowPostView(post:Post(id : "idid" ,titre: "Super uper ", texte: "il m'est arrivé ca c'est super horrible help me please il m'est arrivé ca c'est super horrible help me please il m'est arrivé ca c'est super horrible help me please ", nbSignalement: 4, image:"https://firebasestorage.googleapis.com/v0/b/appli-mobile-ig.appspot.com/o/imagesFolder%2FEAD3F4E5-47AA-4CEE-80BC-A3931DE2EDFF?alt=media&token=21844ebe-8384-4be0-9e26-55463ee09887", localisation: nil, categorie: ["Dans la rue"], note: 156, date: "08/12",user:"mail", isAnonyme:true, couleur:[1.00,1.00,1.00]),navigatePost: {post in},afficherEntier:true,navigateVote: {
 res,post in
 })
 
 DetailRowPostView(post:Post(id : "idid" ,titre: "Super uper ", texte: "il m'est arrivé ca c'est super horrible help me please il m'est arrivé ca c'est super horrible help me please il m'est arrivé ca c'est super horrible help me please ", nbSignalement: 4, image: nil, localisation: ["Montpellier"], categorie: ["Dans la rue"], note: 156, date: "08/12",user:"mail", isAnonyme: true, couleur:[1.00,1.00,1.00]),navigatePost: {post in},afficherEntier:true,navigateVote: {
 res,post in
 })
 
 }
 
 }
 }
 */
