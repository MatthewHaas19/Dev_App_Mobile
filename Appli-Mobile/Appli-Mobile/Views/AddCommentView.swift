//
//  AddPostView.swift
//  Appli-Mobile
//
//  Created by Luca Debeir on 28/02/2020.
//  Copyright © 2020 POLYTECH. All rights reserved.
//

import SwiftUI
import TextView


struct AddCommentView: View {
    
    

    @State var post : Post
    @State var emailUser:String?
    @State var titreCom: String = ""
    @State var texteCom: String = ""
    @State var isEditing = false
    @State var isAnonyme = false
    
    @State private var showingAlert = false
    
    

    var afficherAdd : (Bool) -> ()
    var navigatePost : (Post) -> ()
    
    

    
    @ObservedObject var commentDao = CommentDAO()
    @ObservedObject private var keyboard = KeyboardResponder()
    
  
    
    
    
    var body: some View {
        ScrollView{
        ZStack {
            Color.white
            VStack{
                HStack{
                    Button(action:{
                        self.goBack()
                    })
                    {
                        Image(systemName:"chevron.left").foregroundColor(Color.black)
                        .font(.system(size:15,weight: .bold))
                        Text("Back")
                         .font(.system(size:15,weight: .bold))

                    }.foregroundColor(.black)
                        .frame(width:100,height:40)
                        .cornerRadius(40)
                        .padding()
                    
                    Spacer()
                }.padding()
                

                    HStack{
                        
                        Spacer()
                        
                        Text("Ajouter un Commentaire")
                        .font(.largeTitle)
                        .fontWeight(.semibold)
                        .padding(.bottom, 40)
                        .padding(.top, 60)
                        
                        Spacer()
                    }
                
                    
                
                Toggle(isOn: self.$isAnonyme){
                    Text("Publier en Anonyme")
                }.padding(.top,20)
                
                
                TextField("Titre : ", text: $titreCom)
                .padding()
                .background(Color(red:0.95,green:0.95,blue:0.95))
                .cornerRadius(5.0)
                .padding(.bottom, 20)
                .padding(.top, 20)
                
                
                
                TextView(
                    text: $texteCom,
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
                    }
                    
                    
                    
                    
                    
                
                    

              Spacer()
                    HStack {
                        Spacer()
                        Button(action:{
                            withAnimation{
                                self.showingAlert = (self.titreCom.count == 0 || self.texteCom.count == 0)
                                if (self.showingAlert == false) {
                                     self.createComment()
                                }
                               
                            }
                        }){
                            
                            Text("Ajouter le commentaire")
                                .font(.headline)
                                .foregroundColor(.white)
                                .padding()
                                .frame(width: 220, height: 60)
                                .background(Color(red:0,green:0.8,blue:0.9))
                                .cornerRadius(15.0)
                        }
                        .alert(isPresented: $showingAlert) {
                                                   Alert(title: Text("Format invalide"), message: Text("Veillez à ce que votre post est un titre et une description non vide ! "), dismissButton: .default(Text("Ok")))
                                               }
                       Spacer()
                    }.padding(.bottom,50)
                    
                   
                    
                
                
                
  
            }.padding()
            
            
 
        }.padding(.bottom, keyboard.currentHeight)
        .edgesIgnoringSafeArea(.bottom)
        .animation(.easeOut(duration: 0.16))
        
        }
    }
    
    var colors:[[Double]] = [
    [61/255,173/255,171/255],[27/255,159/255,156/255],[4/255,176/255,186/255],[84/255,188/255,194/255],[27/255,197/255,167/255],[232/255,231/255,18/255],[225/255,218/255,0/255],[240/255,212/255,11/255]
    ]
    
    
    func createComment() {
       

        if(self.emailUser != nil){
            print(self.emailUser)
        }else{
            print("test")
        }
        print(post._id)
        
        
        let comment = CommentPost(postId : self.post._id, titreCom : self.titreCom ,texteCom: self.texteCom, voteCom : 0 ,dateCome : "", user : self.emailUser!, isAnonyme:self.isAnonyme)

            self.commentDao.addComment(comment: comment, completionHandler: {
            
                res in
                if(res){
                    self.afficherAdd(false)
                }
                else{
                    print("add comment error")
                }
            })
       
        
    }
    
    func goBack(){
        self.afficherAdd(false)
    }
    
    
        
    
}

