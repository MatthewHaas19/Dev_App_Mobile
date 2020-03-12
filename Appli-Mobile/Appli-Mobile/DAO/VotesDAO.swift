//
//  ReportDAO.swift
//  Appli-Mobile
//
//  Created by Timothée Temil on 02/03/2020.
//  Copyright © 2020 POLYTECH. All rights reserved.
//

import Foundation





public class VotesDAO: ObservableObject{
    
    @Published var votes = [Vote]()
    @Published var votesComment = [Vote]()
    init(){

    }
       
    
    
    
    func addVotes(vote: Vote, completionHandler: @escaping (Int) -> ()) {
        
        guard let url = URL(string: "https://dev-mobile-ig.herokuapp.com/votes") else { return }
        
        let newReport:[String: Any] = [
            "user" : vote.user,
            "post" : vote.post,
            "like" : vote.like
        ]
        
        
        let body = try! JSONSerialization.data(withJSONObject: newReport)
        
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
                    completionHandler(1)
                }

            }
            else if resData.res == "exists"{
                DispatchQueue.main.async {
                    completionHandler(0)
                }
            }
            else if resData.res == "change"{
                DispatchQueue.main.async {
                    completionHandler(2)
                }
            }
            
            else {
                DispatchQueue.main.async {
                    completionHandler(-1)
                }
            }
               
            


        }.resume()
        
        
    }
    
    func addVotesComment(vote: Vote, completionHandler: @escaping (Int) -> ()) {
        
        guard let url = URL(string: "https://dev-mobile-ig.herokuapp.com/votesComment") else { return }
        
        let newReport:[String: Any] = [
            "user" : vote.user,
            "comment" : vote.post,
            "like" : vote.like
        ]
        
        
        let body = try! JSONSerialization.data(withJSONObject: newReport)
        
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
                    completionHandler(1)
                }

            }
            else if resData.res == "exists"{
                DispatchQueue.main.async {
                    completionHandler(0)
                }
            }
            else if resData.res == "change"{
                DispatchQueue.main.async {
                    completionHandler(2)
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
