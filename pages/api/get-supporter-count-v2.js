// File: pages/api/contacts.js

import createClient from "@/client";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const response = await fetch(
      "https://www.strikingly.com/r/v1/contacts/search?page=1&per=20",
      {
        headers: {
          accept: "application/json",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/json",
          priority: "u=1, i",
          "sec-ch-ua":
            '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Linux"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-csrf-token":
            "bxrp+HOj9SSmAq/HG6M2IJVMtNh7EsRwSlGXY0ohl1wgt2uONy6j78eqNPqUaz/38kO50JjGh4NIFuZHlWrm+A==",
          cookie:
            "__uniq_utm_config=%7B%22utm_source%22%3A%22google-sem%22%2C%22utm_gclid%22%3A%22CjwKCAiA9IC6BhA3EiwAsbltODOsxITkwtrGW6bIb_okTHnadGPXjBTwmPWM5DDgEq_63UEiX90ShRoCe7UQAvD_BwE%22%2C%22utm_medium%22%3A%22cpc%22%2C%22utm_campaign%22%3A%22v2-roas-bb1-computers-search-com-strikingly_other-en%22%2C%22utm_content%22%3A%22v2a-roas-bb1-computers-search-com-strikingly_other-strikingly-en%22%2C%22utm_term%22%3A%22strikingly%22%2C%22utm_timestamp%22%3A1732302249989%2C%22utm_referrer%22%3A%22https%3A%2F%2Fwww.google.com%2F%22%7D; _gid=GA1.2.1618205130.1732302257; _gcl_au=1.1.1749127074.1732302258; _fbp=fb.1.1732302257848.451007036303160518; _tt_enable_cookie=1; _ttp=vSZB6_pRUU8A-vo6xZOIPnvEO0u.tt.1; __strk_viewer_info=eyJpcCI6IjExMC43Ni4xMjkuMTQ1IiwiY291bnRyeUNvZGUiOiJCRCIsImNvdW50cnlOYW1lIjoiQmFuZ2xhZGVzaCIsInJlZ2lvbk5hbWUiOiJEaGFrYSBEaXZpc2lvbiIsImNpdHlOYW1lIjoiRGhha2EifQ==; _gac_UA-25124444-1=1.1732306708.CjwKCAiA9IC6BhA3EiwAsbltOB2Wjg9b2wICsN4ditBRzlRA729LWIRTctvdeIJdx6ttegmkM9d4bhoCqqMQAvD_BwE; _gcl_gs=2.1.k1$i1732306705$u57646696; _gcl_aw=GCL.1732306709.CjwKCAiA9IC6BhA3EiwAsbltOB2Wjg9b2wICsN4ditBRzlRA729LWIRTctvdeIJdx6ttegmkM9d4bhoCqqMQAvD_BwE; fbm_138736959550286=base_domain=.strikingly.com; ajs_user_id=%2218504525%22; ajs_anonymous_id=%2239c22e3c-a9d9-4d24-8e7d-1aa883076dfa%22; _ga_TY4JS231DC=GS1.2.1732312930.1.1.1732312960.0.0.0; __strk_cookie_eu_visitor=false; __client_timezone=%2B0600; __strk_suppress_rewards_tooltip=1; __strk_gallery_updates_available=1; __strk_gallery_timestamp_just_queried=1; __vero_visit=true; __landing_mixpanel_id=18504525; __strk_suppress_gallery_tooltip=1; forgot_email=maruf; user_return_to=%2Fs%2Fsites%2F29239694%2Fedit; signed_in=1; __vero_user=18504525; __strk_cookie_eu_visitor=false; __strk_viewer_info=eyJpcCI6IjExMC43Ni4xMjkuMTQ0IiwiY291bnRyeUNvZGUiOiJCRCIsImNvdW50cnlOYW1lIjoiIiwicmVnaW9uTmFtZSI6IiIsImNpdHlOYW1lIjoiIn0=; __strk_viewer_country=BD; __landing_ft_url=https://www.strikingly.com/content/blog/text-changer/; fbsr_138736959550286=iosGr-_gOYVvqTkzvwVC30VwXKZC8NyQZTJrC1fdNEQ.eyJ1c2VyX2lkIjoiMjA4MTgwMjI1NTU5ODQyNCIsImNvZGUiOiJBUUJzNjNJdVVURHZMNVZBWW9xS08ySW56ODZlUUVwRTJqV0pDQjRYTEtfQlpGMzU4eHpYQ0tBdWdDb2lXTVZ2b1Y3cEhKQmJpa0pwOUdLYk11QnhaQV9xLWp4Q0d1eFVkWTZyaFliSXliZHNWbHA5MkFSRnl1U1lvUkRMMVlUN0o0SXNrbDRocEVQLVhyX1lBYUxnV19EZk56MW9PSWllT1NzRnQ4eDFyMmNDT056YjdDXzdSVDhLUDdGeTNxdGY2VXFYck9RUW5NSVoyUk9wNWhyMmtxUFNiSnhBZ04wQnpJLWFKcVhSN2dBLXdpQ2FrVzJhWVdkOTZvZUZ6dFdmZXhzaVJQQ1lwdTFzWkltdUQ4cFJYdXFVN1VKZWlNejE3MFI3Ym5oQ2wySlZzZzdvOGhrekJJeU05aXpJN2dyWkpKVVRpb2Z3U1FVNnZTN1FDYW9JREUzciIsIm9hdXRoX3Rva2VuIjoiRUFBQlpCTGpjdzgwNEJPMVBseGVzbUZNMG9yN3JMU2lsOXRXVHJ4cUhhR0gxVW1FdmRnOXBlVlpDQTRqbHNRTG4ySXR1d2p3UnNiMGhaQ2JpR2l1dzhBR0ROcFZvRmFINjFOTjU4a3RtRTkwT3ZYaThaQ0VCTjVPVk15YnNsNUxxNHBwNE5ZamVaQjE3YVVJWkF2TVN6QkVUQVYxVkxjdUpJb1pCd0oybVpBNzJuVFZPSzVCSWhCNW5KaFdOM1FaRFpEIiwiYWxnb3JpdGhtIjoiSE1BQy1TSEEyNTYiLCJpc3N1ZWRfYXQiOjE3MzI0OTYxNzd9; __veroc4=%5B%5D; mp_f6f51c06307c973387d0fb45c03fa953_mixpanel=%7B%22distinct_id%22%3A%20%2218504525%22%2C%22%24device_id%22%3A%20%221935542bc081ecd-0677a47d4d666-17462c6e-1fa400-1935542bc081ecd%22%2C%22__mps%22%3A%20%7B%7D%2C%22__mpso%22%3A%20%7B%7D%2C%22__mpus%22%3A%20%7B%7D%2C%22__mpa%22%3A%20%7B%7D%2C%22__mpu%22%3A%20%7B%7D%2C%22__mpr%22%3A%20%5B%5D%2C%22__mpap%22%3A%20%5B%5D%2C%22mp_lib%22%3A%20%22Segment%3A%20web%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fwww.google.com%2F%22%2C%22%24initial_referring_domain%22%3A%20%22www.google.com%22%2C%22%24search_engine%22%3A%20%22google%22%2C%22utm_source%22%3A%20%226267436%22%2C%22utm_medium%22%3A%20%22email%22%2C%22utm_campaign%22%3A%20%22collaboration_invite%22%2C%22utm_content%22%3A%20%226267436%22%2C%22utm_term%22%3A%20%2229239694%22%2C%22%24user_id%22%3A%20%2218504525%22%2C%22mp_name_tag%22%3A%20%22mdmarufbinsalim%40gmail.com%22%7D; fbsr_138736959550286=iosGr-_gOYVvqTkzvwVC30VwXKZC8NyQZTJrC1fdNEQ.eyJ1c2VyX2lkIjoiMjA4MTgwMjI1NTU5ODQyNCIsImNvZGUiOiJBUUJzNjNJdVVURHZMNVZBWW9xS08ySW56ODZlUUVwRTJqV0pDQjRYTEtfQlpGMzU4eHpYQ0tBdWdDb2lXTVZ2b1Y3cEhKQmJpa0pwOUdLYk11QnhaQV9xLWp4Q0d1eFVkWTZyaFliSXliZHNWbHA5MkFSRnl1U1lvUkRMMVlUN0o0SXNrbDRocEVQLVhyX1lBYUxnV19EZk56MW9PSWllT1NzRnQ4eDFyMmNDT056YjdDXzdSVDhLUDdGeTNxdGY2VXFYck9RUW5NSVoyUk9wNWhyMmtxUFNiSnhBZ04wQnpJLWFKcVhSN2dBLXdpQ2FrVzJhWVdkOTZvZUZ6dFdmZXhzaVJQQ1lwdTFzWkltdUQ4cFJYdXFVN1VKZWlNejE3MFI3Ym5oQ2wySlZzZzdvOGhrekJJeU05aXpJN2dyWkpKVVRpb2Z3U1FVNnZTN1FDYW9JREUzciIsIm9hdXRoX3Rva2VuIjoiRUFBQlpCTGpjdzgwNEJPMVBseGVzbUZNMG9yN3JMU2lsOXRXVHJ4cUhhR0gxVW1FdmRnOXBlVlpDQTRqbHNRTG4ySXR1d2p3UnNiMGhaQ2JpR2l1dzhBR0ROcFZvRmFINjFOTjU4a3RtRTkwT3ZYaThaQ0VCTjVPVk15YnNsNUxxNHBwNE5ZamVaQjE3YVVJWkF2TVN6QkVUQVYxVkxjdUpJb1pCd0oybVpBNzJuVFZPSzVCSWhCNW5KaFdOM1FaRFpEIiwiYWxnb3JpdGhtIjoiSE1BQy1TSEEyNTYiLCJpc3N1ZWRfYXQiOjE3MzI0OTYxNzd9; _ga=GA1.1.213437996.1732302257; _ga_QKJZS21BNC=GS1.1.1732499330.16.1.1732500341.40.0.0; XSRF-TOKEN=8r22Mf3tFBLiTP4mfkUfYkundmzMW92hzeSUhYffgJe9EDRHuWBC2YPkZRvxjRa1LKh7ZC%2BPnlLPo%2BWhWJTxMw%3D%3D; _bobcat_session=OGFWZkt3RVZBT2RJcFF5cnZUQWdhMjhLMHl0UE0xZnpPcXZkRmFRQnpZZk0zbGlLclMzZzF5NkoyV0l0RlhlNHROWUlSSjE1WkJJMmpjcXd0WVJ5R2FMc3FGVTBvL01KZFNzY0x3V1dObnlCcElhOUYyZFcwcnY0ZHU4QXluazYvTVRQUVVkRTlUWjRUcGxEeWZpM0hTanYvOEZ0S3hjMDFxS1pucjFUUzBmSm1MblpuOVlQNTNQYUxrWlU2ejZsb0V0dWlaeCthV2JxL2VhMkMvWWtQdm9vWE5ZdjI4MmthT3pQaDVwSHEwdE0xUzZpSkJ5clBZOHMxQUI5UFVqZXgxVy9CSlQxOFpYWVg4YWNZSVVxc0E9PS0tbUl4emJYajVuS2lVaGRsSW9CNHBPUT09--e712c14f2aa2f38c9d3909ac635210007d4171da",
          Referer:
            "https://www.strikingly.com/s/sites/29239694/edit/manage/audience/audienceList?source=6fecf939-7e24-4d10-a63f-db63e3dc6b7d&source=signup_form_untitled&source=f_440b542b-05a7-4944-a879-66a6f42cbd24&source=f_b81cf8f7-8d22-41c1-a455-2cf22b45f827&source=f_b0545b9c-d002-462d-baa2-21be06d7a40d&source=popup_form&source=blog_subscriber&source=booking&source=store_customer&source=crm_live_chat&source=abandoned_cart&source=portfolio_visitor_form&source=imported&source=unreachable&source=unsubscribed",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
        body: '{"isSpam":false,"source":["6fecf939-7e24-4d10-a63f-db63e3dc6b7d","signup_form_untitled","f_440b542b-05a7-4944-a879-66a6f42cbd24","f_b81cf8f7-8d22-41c1-a455-2cf22b45f827","f_b0545b9c-d002-462d-baa2-21be06d7a40d","popup_form","blog_subscriber","booking","store_customer","crm_live_chat","abandoned_cart","portfolio_visitor_form","imported","unreachable","unsubscribed"],"siteId":[29239694]}',
        method: "POST",
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
      res.status(500).json({ error: error.message });
    }

    const currentTime = new Date();
    const data = await response.json();
    const latestPetitionsOfContacts = data?.data?.contacts
      ?.filter(
        (contact) =>
          contact.latestEvent.formId ===
            "f_b81cf8f7-8d22-41c1-a455-2cf22b45f827" &&
          // difference in seconds is less than 30 seconds
          Math.abs(new Date(contact.latestEvent.createdAt) - currentTime) /
            1000 <
            30,
      )
      .map((contact) => ({
        // x: contact.latestEvent,
        id: contact.latestEvent.id,
        name: contact.latestEvent?.data?.customForm?.formEntity[
          "$item1606282593441#name"
        ].firstName,
        email:
          contact.latestEvent?.data?.customForm?.formEntity[
            "$item1606282596776#email"
          ],
        cell: contact.latestEvent?.data?.customForm?.formEntity[
          "$item1606282598273#phone"
        ],
        why: contact.latestEvent?.data?.customForm?.formEntity[
          "$item1606282604448#longText"
        ],
        createdAt: new Date(contact.latestEvent.createdAt),
      }));

    let supabase = createClient(req, res);

    const { data: inserted, insertError } = await supabase
      .from("petitions")
      .insert([...latestPetitionsOfContacts]);

    let { count, fetchError } = await supabase
      .from("petitions")
      .select("*", { count: "exact", head: true });

    if (insertError) {
      throw new Error(`Error inserting data: ${insertError}`);
    }

    if (fetchError) {
      throw new Error(`Error fetching data: ${fetchError}`);
    }

    res.status(200).json({
      count: count,
      // latestPetitionsOfContacts: latestPetitionsOfContacts,
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: error.message });
  }
}
