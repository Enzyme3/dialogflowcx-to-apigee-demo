 /*
    Updates DF CX webhook request body's tag with new tag
    Reads new tag from 'the-golden-ticket.webhookTag' flow variabble
    Reada/sets DF CX webhook body to/from request.content
*/
var webhookTag = context.getVariable('the-golden-ticket.webhookTag');

var dfRequestBody = JSON.parse(context.getVariable('request.content'));
dfRequestBody.fulfillmentInfo.tag = webhookTag;
context.setVariable('the-golden-ticket.request.content', JSON.stringify(dfRequestBody));