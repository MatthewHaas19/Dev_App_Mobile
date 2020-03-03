//
//  UserFetcher.swift
//  Appli-Mobile
//
//  Created by user165001 on 2/18/20.
//  Copyright © 2020 POLYTECH. All rights reserved.
//

import Foundation


public class CommentDAO: ObservableObject{
    
    var postId: String = ""
    @Published var comments = [Comment]()
    @Published var currentComment = [Comment]()
    
    
    init(){
        loadData()
    }
    
    
    func loadData(){
        guard let url = URL(string: "https://dev-mobile-ig.herokuapp.com/comments/" + postId) else { return }
        URLSession.shared.dataTask(with: url){(data, _, _) in
            guard let data = data else { return }
            let res = try! JSONDecoder().decode([Comment].self, from: data)
            DispatchQueue.main.async{
                print(res)
                self.comments = res
            }
        }.resume()
    }
    
   
    
}



