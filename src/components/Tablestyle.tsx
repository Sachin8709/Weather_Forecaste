// Tablestyle.ts
import styled from 'styled-components';

export const TableContainer = styled.div`
  overflow-y: scroll;
  margin-top: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
`;

export const SearchInput = styled.input`
  margin: 10px 10px 20px 10px;
  padding: 8px 12px;
  height: 40px;
  width: 90%;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &::placeholder {
    color: #999;
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;

  th,
  td {
    padding: 12px;
    border-bottom: 1px solid #ddd;
    background-color: #1e2328;
  }

  th {
    background-color: #ffdd00;
    color: black;
    font-weight: bold;
    text-align: left;
    cursor: pointer;
    user-select: none;

    &:hover {
      background-color: #e9ecef;
    }
  }

  td {
    background-color: #1e2328;
    color: #fff;
    font-size: 14px;
  }

  tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  a {
    color: #007bff;
    text-decoration: none;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: #0056b3;
    }
  }
`;
