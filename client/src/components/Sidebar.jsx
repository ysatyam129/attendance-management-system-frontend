import React from 'react'
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


import {
    Users,
    UserPlus,
    Search,
    LogOut,
    Settings,
    Bell,
    Menu,
    X,
  } from "lucide-react";
const sidebar = () => {
  return (
    
      

      <div className=" text-black hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r">
          <div className="flex items-center flex-shrink-0 px-4">
            <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
              EM
            </div>
            <span className="ml-2 text-xl font-semibold">Admin Portal</span>
          </div>
          <div className="mt-8 flex flex-col flex-1 px-3 space-y-1">
            <Button variant="ghost" className="justify-start">
              <Users className="mr-2 h-5 w-5" />
              Employees
            </Button>
            <Button variant="ghost" className="justify-start">
              <UserPlus className="mr-2 h-5 w-5" />
              Add Employee
            </Button>
            <Button variant="ghost" className="justify-start">
              <Settings className="mr-2 h-5 w-5" />
              Settings
            </Button>
          </div>
          <div className="p-4">
            <Link href="/admin/login">
              <Button variant="outline" className="w-full justify-start">
                <LogOut className="mr-2 h-5 w-5" />
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </div>

  )
}

export default sidebar
