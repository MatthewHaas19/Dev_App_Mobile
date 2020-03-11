//
//  RowPostView.swift
//  Appli-Mobile
//
//  Created by Luca Debeir on 23/02/2020.
//  Copyright © 2020 POLYTECH. All rights reserved.
//

import SwiftUI

struct RowCommentView: View {
    
    var comment : Comment
    var currentUser : String?
    
    @State private var showingAlert = false
    @ObservedObject var reportComDAO = ReportCommentDAO()
    
    
    var body: some View {
        VStack{
            
            ZStack{
                //Color.blue.edgesIgnoringSafeArea(.all)
                VStack{
                    
                    HStack{
                        VStack(alignment:.leading, spacing:5){
                            
                            Text(comment.titreCom).foregroundColor(Color.white)
                                .font(.system(size:25))
                            Spacer().frame(height:10)
                            Text(comment.texteCom).foregroundColor(Color.white)
                                .fixedSize(horizontal : false, vertical : true)
                        }
                        Spacer()
                        VStack{
                            Button(action:{}){ Image(systemName:"chevron.up").foregroundColor(Color.white).font(.system(size:25,weight: .bold))
                            }
                            
                            Text(String(comment.voteCom)).foregroundColor(Color.white).font(.system(size:20));
                            Button(action:{print("cc")}){
                                Image(systemName:"chevron.down").foregroundColor(Color.white)
                                    .font(.system(size:25,weight: .bold))
                                
                            }
                        }
                    }.padding()
                    
                    
                    
                    if ( self.currentUser != nil) {
                    HStack{
                        Spacer()
                        
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
                            }
                        }.foregroundColor(.orange)
                    }.padding(.trailing,10)
                        .alert(isPresented: $showingAlert) {
                            Alert(title: Text("Signaler le commentaire"), message: Text("Etes-vous sûr de vouloir signaler le commentaire ?"), primaryButton: .cancel(Text("Annuler")
                                ), secondaryButton: .destructive(Text("Signaler"), action: {
                                    self.addReport()
                                }))
                    }
                }
                
                
                
                }
                
                
            }
        }.padding(.bottom,0)
    }
    
    func addReport(){

        print("----------------------------")
        print(self.currentUser!)
        print(comment._id)
        print("----------------------------")
        
        
        let report = ReportCom(emailUser : self.currentUser!, idCom : self.comment._id)
        
        self.reportComDAO.addReport(report: report, completionHandler: {
            res in
            if(res == 1){
                print("Commentaire Signalé")
            }
            else if (res == 0){
                print("Commentaire Déjà signalé")
            }
            else {
                print("erreur")
            }
        })
    }
}

struct RowCommentView_Previews: PreviewProvider {
    static var previews: some View {
        
        VStack{
            
            RowCommentView(comment: Comment(_id : "idcom", postId : "idpost" ,titreCom: "J'ai deja vecu ca", texteCom: "Je te conseille de prendre du recul sur la situation, et de te rapprocher de pro", voteCom: 13, dateCome: "08/12/2019" , user: "test", isAnonyme: false) )
            
        }
        
    }
}
