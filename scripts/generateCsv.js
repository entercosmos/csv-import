const faker = require('faker')
const fs = require('fs')
const random = require('lodash/random')
const times = require('lodash/times')
const sample = require('lodash/sample')
const Papa = require('papaparse')

const generateAttachment = () => {
    const cat = sample(['wanderlust', 'water', 'canada', 'mountain', 'beach'])
    return `https://source.unsplash.com/featured/400x360?${cat}`
}

const generateAttachments = () => {

    return times(random(0, 5)).map(i => {
        return generateAttachment(i)
    })
}

const generateLinkedRecord = (i) => `${faker.name.findName()}`

const generateLinkedRecords = () => {

    return times(random(0, 8)).map(i => {
        return generateLinkedRecord(i)
    })
}

const content = times(200).map(i => ([
    faker.name.findName(),
    faker.internet.email(),
    sample([null, 1]),
    generateLinkedRecords().join(','),
    generateAttachments().join(','),
    ['opt1', 'opt2', 'opt3'].join(','),
    sample(['opt1', 'opt2', 'opt3', null]),
    32.25,
    `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
]))

// const data = JSON.stringify(content, null, 2)
const data = Papa.unparse({
    fields: [
        'First name',
        'Email address',
        'Published',
        'Friends',
        'Pictures',
        'Colors',
        'Color',
        'Revenue',
        'Notes'
    ],
    data: content
})

fs.writeFileSync(__dirname + '/../demo/src/example.csv', data)