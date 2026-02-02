// components/sections/FilterProjects.js
import React from 'react';

const FilterProjects = ({ 
  categories, 
  activeFilter, 
  onFilterChange 
}) => {
  return (
    <div className="filters-container mb-10">
      <div className="flex flex-wrap justify-center gap-1">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => onFilterChange(category.id)}
            className={`
              relative px-3 py-1.5
              flex items-center gap-2
              transition-all duration-200
              rounded-lg
              ${activeFilter === category.id
                ? `text-white bg-gradient-to-r ${category.gradient}/10`
                : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/30'
              }
              disabled:opacity-40
              group
            `}
            disabled={category.count === 0}
            title={category.desc || category.label}
          >
            {activeFilter === category.id && (
              <div className="absolute -left-0.5 w-1 h-3 rounded-full bg-current"></div>
            )}
            
            <span className="text-sm">{category.icon}</span>
            <span className="font-medium text-xs">{category.label}</span>
            {activeFilter === category.id && (
              <span className="text-xs px-1 py-0.5 rounded bg-white/20">
                {category.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterProjects;