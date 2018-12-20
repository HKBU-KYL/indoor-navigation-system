//
//  FirstViewController.swift
//  ClientApp
//
//  Created by K on 18/12/2018.
//  Copyright © 2018 HKBU. All rights reserved.
//

import UIKit
import Alamofire
import SwiftyJSON
import WebKit

class FirstViewController: UIViewController {
    
    var json:JSON?
    
    @IBOutlet var search_start: UISearchBar!
    @IBOutlet var search_stop: UISearchBar!
    @IBAction func search_btn(_ sender: Any) {
        
        self.view.endEditing(true)
        
//        label.text = ("Start from \(search_start.text ?? "nil") end with \(search_stop.text ?? "nil")")
//        label.numberOfLines = 0
        
//        let url = URL(string: "http://101.78.175.101:4981/getPath/\(search_start.text ?? "nil")/\(search_stop.text ?? "nil")/ios")
        let url = URL(string: "http://101.78.175.101:4981/getPath/\(search_start.text ?? "nil")/\(search_stop.text ?? "nil")/ios")
        let request = URLRequest(url: url!)
        
        webView.load(request)
        
    }
    @IBOutlet var label: UILabel!
    @IBOutlet var webView: WKWebView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let url = "http://101.78.175.101:4981/getPath/RRS701/RRS702"
        
        Alamofire.request(url, method: .get).validate().responseJSON { response in
            
            print("Result: \(response.result)") // response serialization result
            
            switch response.result {
                
            case .success(let value):
                
                // print("JSON: \(value)")      // serialized json response
                
                self.json = JSON(value)         // deserialization
                print("A record: \(self.json?["cost"].stringValue ?? "No Data" )")
                
            case .failure(let error):
                print(error)
            }
        }
    }

}

