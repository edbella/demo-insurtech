import { Theme } from "@table-library/react-table-library/types/theme";

export const tableCustomTheme: Theme = {
	Table: `
  margin-top: 16px`,
	HeaderRow: `
    border-top-left-radius: 8px;
    background-color: #ffff;
    `,
	HeaderCell: `
    border-bottom-width: 0px !important;
    padding: 12px 16px;
    color: #011F4B;
    font-weight: 400;
    font-size: max(12px, calc(var(--fluid-0)* 0.8));
    text-align: center;

    &:first-of-type {
      text-align: left;
    }

    &:last-of-type {
      text-align: right;
    }
    `,
	BaseCell: `
    border-bottom-width: 0px !important;
    color: #011F4B;
    align-items: flex-start;
    font-weight: 400;
    text-align: center;

    &:first-of-type {
      text-align: left;
    }

    &:last-of-type {
      text-align: right;
    }
    
    & > div {
      overflow: visible;
      white-space: normal;
      width: 100%;
      overflow-wrap: break-word;
    }

  
  `,
	Row: `
    &:hover {
      background-color: #FCFCFC !important;
    
      td {
        color: #011F4B;
      }
    };

    &:nth-of-type(odd) {
      background-color: transparent;
    }

    td {

      &[data-active-hover="true"] > div {
       opacity: 0;
       transition: all 0.3s ease-in-out;
      }
    }

    transition: all 0.3s ease-in-out;
    border-radius: 8px;
  `,
};
