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
    @ObservedObject var voteDAO = VotesDAO()
    @ObservedObject var postDAO = PostDAO()
    @ObservedObject var userDAO = UserDAO()
    @ObservedObject var commentDAO = CommentDAO()
    
    @State private var showingAlert = false
    @State var afficherSheet = false
    
    @State var post : Post
    @State var comments : [Comment]
    var currentUser : String?
    var position : String
    var afficherDetail: (Bool) -> ()
    
    @State var show = false
    
    @State var afficherDet = true
    
    @State var image: UIImage? = nil
    
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
                            if ( (self.post.couleur[0] == 225/255) && (self.post.couleur[1] == 170/255) && (self.post.couleur[2] == 18/255) ) {
                                HStack {
                                    Image(systemName:"exclamationmark.triangle")
                                        .resizable()
                                        .aspectRatio(contentMode: .fill)
                                        .frame(width: 15, height: 15)
                                    Text("Signaler")
                                        .font(.system(size:15,weight: .semibold))
                                }.foregroundColor(.blue)
                            }
                           
                                
                            else {
                                 HStack {
                                   Image(systemName:"exclamationmark.triangle")
                                       .resizable()
                                       .aspectRatio(contentMode: .fill)
                                       .frame(width: 15, height: 15)
                                   Text("Signaler")
                                       .font(.system(size:15,weight: .semibold))
                               }.foregroundColor(.orange)
                            }
                            }
                            
                            
                                .padding()
                                .padding(.trailing,10)
                                .alert(isPresented: $showingAlert) {
                                    Alert(title: Text("Signaler le post"), message: Text("Etes-vous sûr de vouloir signaler le post ?"), primaryButton: .cancel(Text("Annuler")
                                        ), secondaryButton: .destructive(Text("Signaler"), action: {
                                            self.addReport()
                                        }))
                            }
                            
                        }
                        
                        
                    }.onAppear { if(self.post.image != nil) {self.downloadImage(completion: {
                        res in
                        self.image = res
                    }) }}
                    
                    
                    HStack {
                        self.afficherDet ? DetailRowPostView(user:userDAO.currentUser,post:self.post,position:self.position,navigatePost:{
                            post in
                            
                        },afficherEntier:true,navigateVote: {
                            res,post in
                            
                            if(self.currentUser != nil){
                            self.voteDAO.addVotes(vote: Vote(user:self.currentUser!,post:post._id,like:res), completionHandler: {
                                result in
                                if(result==1){
                                    self.postDAO.addVote(vote: Vote(user:self.currentUser!,post:post._id,like:res),post:post, completionHandler: {
                                        bool in
                                        //print(res)
                                        if(res){
                                            self.post.note = self.post.note + 1
                                        }else{
                                            self.post.note = self.post.note - 1
                                        }
                                        self.afficherDet = false
                                    })
                                }
                                else if(result==2){
                                    self.postDAO.addVote(vote: Vote(user:self.currentUser!,post:post._id,like:res),post:post, completionHandler: {
                                        bool in
                                    })
                                    self.postDAO.addVote(vote: Vote(user:self.currentUser!,post:post._id,like:res),post:post, completionHandler: {
                                        bool in
                                        // print(res)
                                        if(res){
                                            self.post.note = self.post.note + 2
                                        }else{
                                            self.post.note = self.post.note - 2
                                        }
                                        self.afficherDet = false
                                    })
                                }
                            })
                            }
                            
                            }).padding() : DetailRowPostView(post:self.post,position:self.position,navigatePost:{
                                post in
                                
                            },afficherEntier:true,navigateVote: {
                                res,post in
                                
                                if(self.currentUser != nil){
                                self.voteDAO.addVotes(vote: Vote(user:self.currentUser!,post:post._id,like:res), completionHandler: {
                                    result in
                                    if(result==1){
                                        self.postDAO.addVote(vote: Vote(user:self.currentUser!,post:post._id,like:res),post:post, completionHandler: {
                                            bool in
                                            //print(res)
                                            if(res){
                                                self.post.note = self.post.note + 1
                                            }else{
                                                self.post.note = self.post.note - 1
                                            }
                                            self.afficherDet = true
                                        })
                                    }
                                    else if(result==2){
                                        self.postDAO.addVote(vote: Vote(user:self.currentUser!,post:post._id,like:res),post:post, completionHandler: {
                                            bool in
                                        })
                                        self.postDAO.addVote(vote: Vote(user:self.currentUser!,post:post._id,like:res),post:post, completionHandler: {
                                            bool in
                                            // print(res)
                                            if(res){
                                                self.post.note = self.post.note + 2
                                            }else{
                                                self.post.note = self.post.note - 2
                                            }
                                            self.afficherDet = true
                                        })
                                    }
                                })
                                }
                                
                                }).padding()
                    }.padding()
                    if(image != nil){
                        Button(action:{self.show.toggle()}){
                    Image(uiImage:image!)
                        .renderingMode(.original)
                        .resizable()
                        .aspectRatio(contentMode: .fill)
                        .frame(width: show ? 414 : 300, height: show ? 600 : 300)
                        .clipped()
                        .cornerRadius(show ? 0 : 30)
                        .shadow(radius: 30)
                        .animation(.spring())
                        
                    }.buttonStyle(BorderlessButtonStyle())
                    }
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
                        
                        ListCommentView(post:post, currentUser : currentUser, comments:self.comments)
                            
                    }
                    .cornerRadius(30)
                    .padding()
                    .padding(.top,0)
                    .frame(height:500)
                    Spacer()
                    
                    
                }
                
                
                Spacer().padding(.bottom,1000)
                
                
                
            }
            
            .sheet(isPresented: self.$afficherSheet, content: {
                AddCommentView(post : self.post ,emailUser : self.currentUser , afficherAdd : {
                    afficher in
                    self.afficherSheet=afficher
                    self.commentDAO.loadData(postId: self.post._id, navigateComment:  {
                        comments in
                        self.comments = comments
                    })
                }
                 , navigateComment : {
                    comments in
                    self.comments = comments 
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
    
    func getHeight() -> CGFloat?{
        
            return CGFloat(100)

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
struct PostDetailView_Previews: PreviewProvider {
    static var previews: some View {
        PostDetailView(post:Post(id : "idid" ,titre: "Super uper ", texte: "il m'est arrivé ca c'est super horrible help me please il m'est arrivé ca c'est super horrible help me please il m'est arrivé ca c'est super horrible help me please ", nbSignalement: 4, image: nil, localisation: ["Montpellier"], categorie: ["Dans la rue"], note: 156, date: "08/12",user:"mail", isAnonyme:true,  couleur:[1.00,1.00,1.00]), afficherDetail : {afficher in } )
    }
}

*/
