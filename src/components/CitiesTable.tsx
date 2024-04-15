// CitiesTable.tsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { TableContainer, SearchInput, StyledTable } from './Tablestyle';

interface City {
  geoname_id: string;
  name: string;
  cou_name_en: string;
  timezone: string;
}

const CitiesTable: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedColumn, setSortedColumn] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const handleFetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get<{ total_count: number; results: City[] }>(
        `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20&sort=${sortedColumn}&order=${sortOrder}&q=${searchTerm}&page=${page}`
      );
      setCities(prevCities => [...prevCities, ...response.data.results]);
      setHasMore(response.data.results.length > 0);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [searchTerm, sortedColumn, sortOrder, page]);

  useEffect(() => {
    handleFetchData();
  }, [handleFetchData]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset page to 1 when searching
    setCities([]); // Clear existing cities when searching
  };

  const handleSort = (column: string) => {
    if (column === sortedColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortedColumn(column);
      setSortOrder('asc');
    }
  };

  const handleCityClick = (cityId: string) => {
    // Navigate to weather page for the city
    console.log(`Navigating to weather page for cityId: ${cityId}`);
    // Example: window.location.href = `/weather/${cityId}`;
  };

  const handleCityRightClick = (e: React.MouseEvent, cityId: string) => {
    e.preventDefault();
    // Open weather page for the city in a new tab
    console.log(`Opening weather page for cityId: ${cityId} in a new tab`);
    // Example: window.open(`/weather/${cityId}`, '_blank');
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const bottom =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      e.currentTarget.clientHeight;
    if (bottom && hasMore && !loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const filteredCities = useMemo(() => {
    return cities.filter(city =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [cities, searchTerm]);

  return (
    <div style={{ height: '500px', overflowY: 'scroll' }} onScroll={handleScroll}>
      <SearchInput type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search by city name" />
      <StyledTable>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>City Name</th>
            <th onClick={() => handleSort('country')}>Country</th>
            <th onClick={() => handleSort('timezone')}>Timezone</th>
          </tr>
        </thead>
        <tbody>
          {filteredCities.map(city => (
            <tr key={city.geoname_id}>
              <td>
                <Link
                  to={`/weather/${city.name}`}
                  onClick={() => handleCityClick(city.geoname_id)}
                  onContextMenu={e => handleCityRightClick(e, city.geoname_id)}
                >
                  {city.name}
                </Link>
              </td>
              <td>{city.cou_name_en}</td>
              <td>{city.timezone}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </div>
  );
};

export default CitiesTable;
