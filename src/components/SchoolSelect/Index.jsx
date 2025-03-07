import React from 'react';
import { Select } from 'antd';
import { useGetSchoolsQuery } from '../../store/Apis/schoolsApi';
import { Spin, Alert } from 'antd';

const SchoolSelect = ({setSchool}) => {
    const options = [];
    const{ data , isLoading , error} = useGetSchoolsQuery();
    if(!isLoading){
        console.log( "from school select", data);
        for (let i = 0; i < data.length; i++) {
            options.push({
              value: data[i]['id'],
              label: data[i]['name'],
            });
        }
    }

    const handleChange = (value) => {
        console.log(`selected ${value}`);
        setSchool(value);
    };

    // const onSearch = (value) => {
    //     console.log('search:', value);
    // };
    if(isLoading) return (
        <Spin tip="Loading..." >
          <Alert
            message=""
          />
        </Spin>
    )

    return (
        <Select
            showSearch
            style={{
            width: '100%',
            }}
            placeholder="Select School"
            optionFilterProp="label"
            // onSearch={onSearch}
            onChange={handleChange}
            options={options}
        />
)
};
export default SchoolSelect;