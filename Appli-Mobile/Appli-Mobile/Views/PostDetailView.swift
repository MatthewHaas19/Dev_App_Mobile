//
//  PostDetailView.swift
//  Appli-Mobile
//
//  Created by Luca Debeir on 28/02/2020.
//  Copyright © 2020 POLYTECH. All rights reserved.
//

import SwiftUI

struct PostDetailView: View {
    
    @ObservedObject var reportDAO = ReportDAO()
    
    @State private var showingAlert = false
    @State var afficherSheet = false
    
    var post : Post
    var currentUser : String?
    
    var afficherDetail: (Bool) -> ()
    
    
    var body: some View {
        ScrollView{
            
            
            ZStack {
                Color(red:post.couleur[0], green:post.couleur[1], blue:post.couleur[2])
                    .edgesIgnoringSafeArea(.all)
                VStack{
                    
                    HStack{
                        Button(action:{
                            self.goBack()
                        })
                        {
                            Image(systemName:"chevron.left").foregroundColor(Color.white)
                                .font(.system(size:15,weight: .bold))
                            Text("Back")
                                .font(.system(size:15,weight: .bold))
                            
                        }.foregroundColor(.white)
                            .frame(width:100,height:40)
                            .cornerRadius(40)
                            .padding()
                        
                        Spacer()
                        
                        if (self.currentUser != nil) {
                            
                            Button(action:{
                                self.showingAlert = true
                                print("test")
                            })
                            {
                                HStack {
                                    Image(systemName:"exclamationmark.triangle")
                                        .resizable()
                                        .aspectRatio(contentMode: .fill)
                                        .frame(width: 15, height: 15)
                                    Text("Signaler")
                                        .font(.system(size:15,weight: .semibold))
                                }
                            }.foregroundColor(.orange)
                                .padding()
                                .padding(.trailing,10)
                                .alert(isPresented: $showingAlert) {
                                    Alert(title: Text("Signaler le post"), message: Text("Etes-vous sûr de vouloir signaler le post ?"), primaryButton: .cancel(Text("Annuler")
                                        ), secondaryButton: .destructive(Text("Signaler"), action: {
                                            self.addReport()
                                        }))
                            }
                            
                        }
                        
                        
                    }
                    
                    
                    HStack {
                        DetailRowPostView(post:post,navigatePost:{
                            post in
                            
                        },afficherEntier:true,navigateVote: {
                            res,post in
                            
                        }).padding()
                    }.padding()
                    
                    
                    if(self.currentUser != nil) {
                        
                        HStack{
                            
                            Button(action:{
                                self.afficherSheet=true
                                print("user : ")
                                print(self.currentUser!)
                            })
                            {
                                HStack {
                                    
                                    Image(systemName:"plus.rectangle.fill")
                                        .font(.system(size:25,weight: .bold)).padding()
                                    Text("Ajouter un commentaire")
                                        .font(.system(size:21,weight: .bold))
                                    
                                    Spacer()
                                }.padding()
                                    .foregroundColor(.white)
                                
                            }
                            
                        }.padding(.trailing)
                            .padding(.leading)
                        
                    }
                    
                    
                    
                    HStack {
                        ListCommentView(post:post, currentUser : currentUser)
                            .frame(width:380)
                    }.cornerRadius(30)
                    .padding()
                    .padding(.top,0)
                    .padding(.leading,10)
                    .padding(.trailing,10)
                    .frame(height:500)
                    Spacer()
                    
                    
                }
                
                
                Spacer().padding(.bottom,1000)
                
                
                
            }
             
            .sheet(isPresented: self.$afficherSheet, content: {
                AddCommentView(post : self.post ,emailUser : self.currentUser , afficherAdd : {
                    afficher in
                    self.afficherSheet=afficher
                }, navigatePost : {
                    post in
                })
                
            })
               
            Spacer()
        }.edgesIgnoringSafeArea(.all)
    }
    
    
    
    
    
    func addReport(){
        
        let report = Report(emailUser : self.currentUser!, idPost : post._id)
        
        self.reportDAO.addReport(report: report, completionHandler: {
            res in
            if(res == 1){
                print("Signalé")
            }
            else if (res == 0){
                print("Déjà signalé")
            }
            else {
                print("erreur")
            }
        })
    }
    
    func goBack(){
        self.afficherDetail(false)
    }
}










struct PostDetailView_Previews: PreviewProvider {
    static var previews: some View {
        PostDetailView(post:Post(id : "idid" ,titre: "Super uper ", texte: "il m'est arrivé ca c'est super horrible help me please il m'est arrivé ca c'est super horrible help me please il m'est arrivé ca c'est super horrible help me please ", nbSignalement: 4, image: nil, localisation: ["Montpellier"], categorie: ["Dans la rue"], note: 156, date: "08/12",user:"mail", isAnonyme:true,  couleur:[1.00,1.00,1.00]), afficherDetail : {afficher in } )
    }
}

