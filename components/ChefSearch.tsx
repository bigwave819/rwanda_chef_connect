'use client'

import { Search } from "lucide-react";
import { useState } from "react";

function ChefSearch() {
    const [ searchQuery, setSeatchQuery ] = useState('')
    return ( 
        <div className="relative w-xl max-w-xl">
            <Search className="icon-input" />
            <input 
                value={searchQuery}
                onChange={(e) => setSeatchQuery(e.target.value)}
                placeholder="search Chefs ..."
                className="input"
            />
        </div>
     );
}

export default ChefSearch;