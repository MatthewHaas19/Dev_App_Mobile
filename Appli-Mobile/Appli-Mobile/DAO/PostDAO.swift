//
//  UserFetcher.swift
//  Appli-Mobile
//
//  Created by user165001 on 2/18/20.
//  Copyright © 2020 POLYTECH. All rights reserved.
//

import Foundation


public class PostDAO: ObservableObject{
    
    @Published var posts = [Post]()
    @Published var currentPost = [Post]()
    
    
    init(){
        loadData()
    }
    
    
    func loadData(){
        guard let url = URL(string: "https://dev-mobile-ig.herokuapp.com/posts") else { return }
        URLSession.shared.dataTask(with: url){(data, _, _) in
            guard let data = data else { return }
            let res = try! JSONDecoder().decode([Post].self, from: data)
            DispatchQueue.main.async{
                print(res)
                self.posts = res
            }
        }.resume()
    }
    
}

