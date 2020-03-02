//
//  ReportDAO.swift
//  Appli-Mobile
//
//  Created by Timothée Temil on 02/03/2020.
//  Copyright © 2020 POLYTECH. All rights reserved.
//

import Foundation





public class ReportDAO: ObservableObject{
    
    @Published var reports = [Report]()
    @Published var currentReport = [Report]()
    init(){

    }
     
    
    func loadData(){
        guard let url = URL(string: "https://dev-mobile-ig.herokuapp.com/reports") else { return }
        URLSession.shared.dataTask(with: url){(data, _, _) in
          guard let data = data else { return }
          let res = try! JSONDecoder().decode([Report].self, from: data)
          DispatchQueue.main.async{
            print(res)
            self.reports = res
          }
        }.resume()
    }
       
    
    
    
    func addReport(report: Report, completionHandler: @escaping (Int) -> ()) {
        
        guard let url = URL(string: "https://dev-mobile-ig.herokuapp.com/reports") else { return }
        
        let newReport:[String: Any] = [
            "emailUser" : report.emailUser,
            "idPost" : report.idPost
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
            
            else {
                DispatchQueue.main.async {
                    completionHandler(-1)
                }
            }
               
            


        }.resume()
        
        
    }
    
    
    
    
    
}
