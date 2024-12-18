// File: pages/api/contacts.js

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const url = "https://www.strikingly.com/r/v1/contacts/search?page=1&per=20";
  const headers = {
    accept: "application/json",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/json",
    cookie:
      "__strk_viewer_country=BD; __strk_cookie_eu_visitor=false; __uniq_utm_config=%7B%22utm_source%22%3A%22google-sem%22%2C%22utm_gclid%22%3A%22CjwKCAiA9IC6BhA3EiwAsbltODOsxITkwtrGW6bIb_okTHnadGPXjBTwmPWM5DDgEq_63UEiX90ShRoCe7UQAvD_BwE%22%2C%22utm_medium%22%3A%22cpc%22%2C%22utm_campaign%22%3A%22v2-roas-bb1-computers-search-com-strikingly_other-en%22%2C%22utm_content%22%3A%22v2a-roas-bb1-computers-search-com-strikingly_other-strikingly-en%22%2C%22utm_term%22%3A%22strikingly%22%2C%22utm_timestamp%22%3A1732302249989%2C%22utm_referrer%22%3A%22https%3A%2F%2Fwww.google.com%2F%22%7D; __landing_gad_source=1; __landing_version=landing5; __vero_visit=true; _gid=GA1.2.1618205130.1732302257; _gcl_au=1.1.1749127074.1732302258; _fbp=fb.1.1732302257848.451007036303160518; _tt_enable_cookie=1; _ttp=vSZB6_pRUU8A-vo6xZOIPnvEO0u.tt.1; __landing_ft_url=https://support.strikingly.com/hc/en-us/articles/214364338-Connecting-a-WordPress-com-Domain-to-your-Strikingly-Site; __strk_viewer_country=BD; __strk_viewer_info=eyJpcCI6IjExMC43Ni4xMjkuMTQ1IiwiY291bnRyeUNvZGUiOiJCRCIsImNvdW50cnlOYW1lIjoiQmFuZ2xhZGVzaCIsInJlZ2lvbk5hbWUiOiJEaGFrYSBEaXZpc2lvbiIsImNpdHlOYW1lIjoiRGhha2EifQ==; __strk_cookie_eu_visitor=false; __landing_utm_campaign=v2-roas-bb1-computers-search-hi-build_website-en; __landing_utm_content=v2a-roas-bb1-computers-search-hi-build_website-build_website_howto_sx-en; __landing_utm_term=website%20builders; __landing_gclid=CjwKCAiA9IC6BhA3EiwAsbltOB2Wjg9b2wICsN4ditBRzlRA729LWIRTctvdeIJdx6ttegmkM9d4bhoCqqMQAvD_BwE; _gac_UA-25124444-1=1.1732306708.CjwKCAiA9IC6BhA3EiwAsbltOB2Wjg9b2wICsN4ditBRzlRA729LWIRTctvdeIJdx6ttegmkM9d4bhoCqqMQAvD_BwE; _gcl_gs=2.1.k1$i1732306705$u57646696; _gcl_aw=GCL.1732306709.CjwKCAiA9IC6BhA3EiwAsbltOB2Wjg9b2wICsN4ditBRzlRA729LWIRTctvdeIJdx6ttegmkM9d4bhoCqqMQAvD_BwE; __landing_utm_source=nav; __landing_utm_medium=kb; __landing_query=utm_source%3Dnav%26utm_medium%3Dkb; __landing_ref_url=https%3A%2F%2Fsupport.strikingly.com%2F; __client_timezone=%2B0600; __strk_suppress_rewards_tooltip=1; __strk_gallery_updates_available=1; __strk_gallery_timestamp_just_queried=1; fbm_138736959550286=base_domain=.strikingly.com; signed_in=1; __strk_aliased=1; __strk_suppress_gallery_tooltip=1; _pbs_i18n_ab_test=b; ajs_user_id=%2218504525%22; ajs_anonymous_id=%2239c22e3c-a9d9-4d24-8e7d-1aa883076dfa%22; __vero_user=18504525; __landing_mixpanel_id=18504525; __strk_session_id=visotor-23d42f442ec14e0badc682718a97bf8f; _ga_TY4JS231DC=GS1.2.1732312930.1.1.1732312960.0.0.0; fbsr_138736959550286=fJx3TdUW47G1PYxkM1kRrPguMZxuWf-W0DVlWuHF4p0.eyJ1c2VyX2lkIjoiMjA4MTgwMjI1NTU5ODQyNCIsImNvZGUiOiJBUUNWM2FJdV9JOW5ONU8wREtkRFlCMkpPUTdKSmc0ckVHRWhsejdpRkZNMnEtM3hsSFVUZWEzOGp6TldMMTFyMzFPMi1taDhwRTFHTDYzMVVsQ2JURzFxbXZWUEVGcVBSUTJDTEdvWkI2cG1zVnVDRlpXQ3VLSEphRUZRVkpzM1F4azBXX25Sd05BRmF4Zm9UQzJCZktGTkJscF95MnMyMXljOXk4NXFBbUtUM2dIRFhLeTRaSjJDR1pDR2tQQ2RTWEhjeGZjV0hsVk5sUjZxOHBScFBCZGN5MFlZM2pNbTNycXpGd1FfNXVSYTRTX3NUYzNhUERSWllXQmVfQ3Y4cFhjNmhkVGo1NERBazZyemROTDBtOW1YaDV5T09ibTNYMW1MM3dra3hKWG5SR3JFeE9mMnFXVGZEMEhSbmVBRW1VcG9raTlmZnc0cEdicFl6S1JWaVFiRSIsIm9hdXRoX3Rva2VuIjoiRUFBQlpCTGpjdzgwNEJPMVBseGVzbUZNMG9yN3JMU2lsOXRXVHJ4cUhhR0gxVW1FdmRnOXBlVlpDQTRqbHNRTG4ySXR1d2p3UnNiMGhaQ2JpR2l1dzhBR0ROcFZvRmFINjFOTjU4a3RtRTkwT3ZYaThaQ0VCTjVPVk15YnNsNUxxNHBwNE5ZamVaQjE3YVVJWkF2TVN6QkVUQVYxVkxjdUpJb1pCd0oybVpBNzJuVFZPSzVCSWhCNW5KaFdOM1FaRFpEIiwiYWxnb3JpdGhtIjoiSE1BQy1TSEEyNTYiLCJpc3N1ZWRfYXQiOjE3MzIzNDU3ODh9; __strk_viewer_info=eyJpcCI6IjExMC43Ni4xMjkuMTQ2IiwiY291bnRyeUNvZGUiOiJCRCIsImNvdW50cnlOYW1lIjoiIiwicmVnaW9uTmFtZSI6IiIsImNpdHlOYW1lIjoiIn0=; __form_connecting_uuid=c4b7d16c-d77f-49d3-ae99-d8c43bcaac2a; __site_c4b7d16c-d77f-49d3-ae99-d8c43bcaac2a=29239694; __subdomain_c4b7d16c-d77f-49d3-ae99-d8c43bcaac2a=www; fbsr_138736959550286=iWttWqUmf2k7zyagx_agstavsFyOmPsMx6ffYXGiWdI.eyJ1c2VyX2lkIjoiMjA4MTgwMjI1NTU5ODQyNCIsImNvZGUiOiJBUUNXRXN4RUQxMVdXRnZjZTh2TExRQ25BSUtaQi0zeUVtUTVaNkxrQnNpdFRqQ0RXZW5mS0tSMzZnQWJwdzNsbDZFOTRpN1JGTzNoSFA0cmhZRklhRENaNjM3REtmRmlBX2VfU2lMLXhkeGtBNTdSOXFLTDE4Sy1vLXNmblE4bGFQbFkwbjM3cWNNNEpOVzhRX25iMHQ4N2VaLTI0WHFtdk5JNmRhdzllNUtoX0h2Q1R5US1WamV3alN2YjdkS0VWVnRxNkhrWUVSZTlzTHVabEl3MUxsWC02Rk1iYkozb21veTR6d0F0bUJkdzBxNHBxQktaell0M3VKT0hNazVOVjBfXzd6a0NjQTBpXzQ1UUtENTZfVjgtMEFDZkl2Qno2cVNQX1ZVYktvcXl1d3hkZzFQa0swOFdyeU1BdkRpYl9LbkNDMTdtdlVfZC0xS3AycEdwV1dYUCIsIm9hdXRoX3Rva2VuIjoiRUFBQlpCTGpjdzgwNEJPMVBseGVzbUZNMG9yN3JMU2lsOXRXVHJ4cUhhR0gxVW1FdmRnOXBlVlpDQTRqbHNRTG4ySXR1d2p3UnNiMGhaQ2JpR2l1dzhBR0ROcFZvRmFINjFOTjU4a3RtRTkwT3ZYaThaQ0VCTjVPVk15YnNsNUxxNHBwNE5ZamVaQjE3YVVJWkF2TVN6QkVUQVYxVkxjdUpJb1pCd0oybVpBNzJuVFZPSzVCSWhCNW5KaFdOM1FaRFpEIiwiYWxnb3JpdGhtIjoiSE1BQy1TSEEyNTYiLCJpc3N1ZWRfYXQiOjE3MzIzNzg2MjF9; __veroc4=%5B%5D; mp_f6f51c06307c973387d0fb45c03fa953_mixpanel=%7B%22distinct_id%22%3A%20%2218504525%22%2C%22%24device_id%22%3A%20%221935542bc081ecd-0677a47d4d666-17462c6e-1fa400-1935542bc081ecd%22%2C%22__mps%22%3A%20%7B%7D%2C%22__mpso%22%3A%20%7B%7D%2C%22__mpus%22%3A%20%7B%7D%2C%22__mpa%22%3A%20%7B%7D%2C%22__mpu%22%3A%20%7B%7D%2C%22__mpr%22%3A%20%5B%5D%2C%22__mpap%22%3A%20%5B%5D%2C%22mp_lib%22%3A%20%22Segment%3A%20web%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fwww.google.com%2F%22%2C%22%24initial_referring_domain%22%3A%20%22www.google.com%22%2C%22%24search_engine%22%3A%20%22google%22%2C%22utm_source%22%3A%20%226267436%22%2C%22utm_medium%22%3A%20%22email%22%2C%22utm_campaign%22%3A%20%22collaboration_invite%22%2C%22utm_content%22%3A%20%226267436%22%2C%22utm_term%22%3A%20%2229239694%22%2C%22%24user_id%22%3A%20%2218504525%22%2C%22mp_name_tag%22%3A%20%22mdmarufbinsalim%40gmail.com%22%7D; _ga=GA1.1.213437996.1732302257; _ga_QKJZS21BNC=GS1.1.1732377942.7.1.1732379166.60.0.0; XSRF-TOKEN=AdxDw0kpwlOUaYwZnlyQk0D1%2BvG0DM41NIZYMzQw5tMbLxNBi3E%2FeJXjdF2QGOyyz9wpSlYe1MOUssiXpGKWAg%3D%3D; _bobcat_session=UDdzaUREMFcxOVZ2NFMwVG1teGQrbDF2REdrSUM2ZEVEaGhNcWJqbXRwRTFKWU9oWlBMblo2NGxQT3dWaHJBenpocUYvTmpPK1dRQ2lNQlNJdmJNTVdob3gxTlc1TUVwbGtmWjR4ZWNLcFhQMzFKRDB5RTBhSlRKRG8zbGg4bHdwZVNKNUNINE4wdjVJUE1ybDBVc2Uxb3FqcXovSHR0YjMwKzRBaitrQ0RaTVJkYXZLNzVUL1ErQTZNVnJjQkFEYm9LaFRsZDdjVU5nM0hQaTFYcmp1dlEvVGZIVnBNUWFITmU1cnJlMHRWRGhtd2dSQks3Y1hLUlZta0N0TTNsTWxURlNlL0I4MXJNNkRvRzdhMUlsRVJ1RGFlV3doa3NyS3o3OTloTW84L0ROTmdHV1NpZ3BQZTJxcWhFSVU4SHMtLWJFWEpvUjNJUzlRYjl0blFWSlU4cUE9PQ%3D%3D--2fe1cc50c676992f8ed8e6e5ddf8c9a8862cdf03", // Replace with your full cookie string
  };

  try {
    let body = {
      isSpam: false,
      source: [
        "f_440b542b-05a7-4944-a879-66a6f42cbd24",
        "f_b81cf8f7-8d22-41c1-a455-2cf22b45f827",
      ],
      siteId: [29239694],
    };
    const response = await fetch(url, {
      method: "POST",
      headers,
      //   body: body,
      //   body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
      res.status(500).json({ error: error.message });
    }

    const data = await response.json();
    const count = data?.data?.paginationMeta?.totalCount;
    res.status(200).json({
      count: count,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: error.message });
  }
}
