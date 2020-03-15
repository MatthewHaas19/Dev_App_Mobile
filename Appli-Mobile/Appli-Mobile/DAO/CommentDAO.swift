//
//  UserFetcher.swift
//  Appli-Mobile
//
//  Created by user165001 on 2/18/20.
//  Copyright © 2020 POLYTECH. All rights reserved.
//

import Foundation


public class CommentDAO: ObservableObject{
    
    @Published var comments = [Comment]()
    @Published var currentComment = [Comment]()
    
    init(){
        
    }
    
    
    func loadData(postId:String , navigateComment : @escaping ([Comment])->()){
        guard let url = URL(string: "https://dev-mobile-ig.herokuapp.com/comments/" + postId) else { return }
        URLSession.shared.dataTask(with: url){(data, _, _) in
            guard let data = data else { return }
            let res = try! JSONDecoder().decode([Comment].self, from: data)
            DispatchQueue.main.async{
                self.comments = res
                navigateComment(res)
            }
        }.resume()
    }
    
    
    func addComment(comment: CommentPost, completionHandler: @escaping (Bool) -> ()) {
           
           guard let url = URL(string: "https://dev-mobile-ig.herokuapp.com/comments") else { return }
           
           let newComment:[String: Any?] = [
            "postId" : comment.postId,
            "titreCom" : comment.titreCom,
            "texteCom" : comment.texteCom,
            "voteCom" : 0,
            "dateCom" : comment.dateCom,
            "user" : comment.user,
            "isAnonyme" : comment.isAnonyme
               
           ]
           
           let body = try! JSONSerialization.data(withJSONObject: newComment)
           
           var request = URLRequest(url: url)
           request.httpMethod = "POST"

           request.httpBody = body
           request.setValue("application/json", forHTTPHeaderField: "Content-Type")
           
           URLSession.shared.dataTask(with: request) { (data, response, error) in

               guard let data = data else { return }
               
               let resData = try! JSONDecoder().decode(ServerMessage.self, from: data)

               print(resData.res)

               if resData.res == "correct" {
                   DispatchQueue.main.async {
                       completionHandler(true)
                   }

               }
               else {
                   DispatchQueue.main.async {
                       completionHandler(false)
                   }
               }

           }.resume()

       }
    
    func addVote(vote: Vote,comment:Comment ,completionHandler: @escaping (Int) -> ()) {
        var like:String
        if(vote.like){
            like="true"
        }
        else{
            like="false"
        }
        
        guard let url = URL(string: "https://dev-mobile-ig.herokuapp.com/comments/addVote/"+like) else { return }
        
        let newVote:[String: Any] = [
            "_id" : comment._id
        ]
        
        
        let body = try! JSONSerialization.data(withJSONObject: newVote)
        
        var request = URLRequest(url: url)
        request.httpMethod = "PUT"
        request.httpBody = body
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        URLSession.shared.dataTask(with: request) { (data, response, error) in

            guard let data = data else { return }
            
            let resData = try! JSONDecoder().decode(ServerMessage.self, from: data)


            if resData.res == "correct" {
                DispatchQueue.main.async {
                    completionHandler(1)
                }

            }
            else if resData.res == "exists"{
                DispatchQueue.main.async {
                    completionHandler(0)
                }
            }
            
            else {
                DispatchQueue.main.async {
                    completionHandler(-1)
                }
            }
               
            


        }.resume()
        
        
    }
   
    
}



