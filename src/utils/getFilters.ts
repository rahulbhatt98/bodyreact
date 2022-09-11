// export const getFiltersData = (filtersData: any) => {
//   const filterHeadings: any = [];
//   const filters: any = [];
//   let param = filtersData;
//   if (param) {
//     Object.keys(param).map((key: any) => {
//       filterHeadings.push(key);
//     });

//     var names = new Array();
//     filterHeadings.map((heading: any) => {
//       param[heading] &&
//         param[heading].map((key: any) => {
//           if (names.includes(key["name"])) {
//           } else {
//             names.push(key["name"]);
//           }
//         });
//     });

//     names.map((name) => {
//       filters[name] = [];
//     });

//     filterHeadings.map((heading: any) => {
//       param[heading] &&
//         param[heading].map((key: any) => {
//           key["options"] &&
//             key["options"].forEach((val: any) => {
//               if (!filters[key["name"]].includes(val))
//                 filters[key["name"]].push(val);
//             });
//         });
//     });
//   }
//   return filters;
// };




export const getFiltersData = (filtersData: any) => {
  let filters: any = [];
  let param = filtersData;
  if (param.keys?.length) {
    let filterKeys = param.keys
    let filterValues = param.data
    filterKeys.map((key: string) => {
      if (key === 'customAttributes') {
        filterValues[key].map((val: any) => {
          val.type = 'customAttributes';
          return val;
        })
        filters.splice(1, 0, ...filterValues[key])
      } else if (key === 'subCategories') {
        filters.push({ id: key, type: key, name: "Categories", options: filterValues[key] })

      } else {
        filterValues[key].map((item: any) => {
          var existing = filters.filter(function (v: any, i: any) {
            return v.name == item.name;
          });
          if (existing.length) {
            var existingIndex = filters.indexOf(existing[0]);
            filters[existingIndex].options.push({ _id: item._id, name: item.options[0] });
          } else {
            item = { ...item, type: key, options: [{ _id: item._id, name: item.options[0] }] }
            filters.push(item);
          }
        });
      }
    })
    return filters;
  }
  return filters;
};
