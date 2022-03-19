import { useState } from "react";
import { postCreateAccount } from "../api/auth";
import Input from "./Input";
import styles from "./NewUserPopup.module.css";
import Spinner from "./Spinner";

export default function NewUserPopup({phone, nextStep}) {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(phone);
  const [email, setEmail] = useState("");

  return (
    <>
      <div className={styles.blocker} />
      <div className={`card ${styles.container}`}>
        {loading ? (
          <div className={"loading-container-full"}>
            <Spinner />
          </div>
        ) : (
          <>
            <div>
              <h1>/ New Client Profile :</h1>
              <Input
                style={{ width: "100%", marginTop: 18 }}
                value={firstName}
                onChange={setFirstName}
                placeholder="First Name"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="18"
                    viewBox="0 0 20 18"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.5 10.1429C6.80656 10.1429 4.625 8.09714 4.625 5.57143C4.625 3.04571 6.80656 1 9.5 1C12.1934 1 14.375 3.04571 14.375 5.57143C14.375 8.09714 12.1934 10.1429 9.5 10.1429ZM3 17C3 13.6337 5.91015 10.9048 9.5 10.9048C13.0899 10.9048 16 13.6337 16 17H14.375C14.375 14.4753 12.1924 12.4286 9.5 12.4286C6.80761 12.4286 4.625 14.4753 4.625 17H3ZM12.75 5.57143C12.75 7.25524 11.2956 8.61905 9.5 8.61905C7.70438 8.61905 6.25 7.25524 6.25 5.57143C6.25 3.88762 7.70438 2.52381 9.5 2.52381C11.2956 2.52381 12.75 3.88762 12.75 5.57143Z"
                      fill="black"
                    />
                  </svg>
                }
              />
              <Input
                style={{ width: "100%", marginTop: 18 }}
                value={lastName}
                onChange={setLastName}
                placeholder="Last Name"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="18"
                    viewBox="0 0 20 18"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.5 10.1429C6.80656 10.1429 4.625 8.09714 4.625 5.57143C4.625 3.04571 6.80656 1 9.5 1C12.1934 1 14.375 3.04571 14.375 5.57143C14.375 8.09714 12.1934 10.1429 9.5 10.1429ZM3 17C3 13.6337 5.91015 10.9048 9.5 10.9048C13.0899 10.9048 16 13.6337 16 17H14.375C14.375 14.4753 12.1924 12.4286 9.5 12.4286C6.80761 12.4286 4.625 14.4753 4.625 17H3ZM12.75 5.57143C12.75 7.25524 11.2956 8.61905 9.5 8.61905C7.70438 8.61905 6.25 7.25524 6.25 5.57143C6.25 3.88762 7.70438 2.52381 9.5 2.52381C11.2956 2.52381 12.75 3.88762 12.75 5.57143Z"
                      fill="black"
                    />
                  </svg>
                }
              />
              <Input
                style={{ width: "100%", marginTop: 18 }}
                value={phoneNumber}
                onChange={setPhoneNumber}
                placeholder="Phone Number"
                icon={
                  <svg width="27" height="16" viewBox="0 0 27 16" fill="none">
                    <rect
                      y="0.928558"
                      width="27"
                      height="14.1429"
                      fill="url(#pattern0)"
                    />
                    <defs>
                      <pattern
                        id="pattern0"
                        patternContentUnits="objectBoundingBox"
                        width="1"
                        height="1"
                      >
                        <use
                          xlinkHref="#image0_0_175"
                          transform="scale(0.00125 0.0023753)"
                        />
                      </pattern>
                      <image
                        id="image0_0_175"
                        width="800"
                        height="421"
                        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAyAAAAGlCAMAAAA1TGIYAAABIFBMVEWyIjT///88O26uFimvGiyxHzHiqbDy2d0wL2U5OGy/RlX++/vnu8D25ujJZHG2LT6zJTc3NmszMme0Jjjmt73VhY/Tgow1NGkxMGaTk69AP3FlZI1KSXjx8fX8/P3h4ek9PG+1tchFRHVEOWrj4+qqJDilpbyKiqhvbpTPzttYV4P29vhIR3dCQXPm5u3W1uH4+Pq/vtBra5FVVIHp6e9eXog/PXDu7vKxscXDw9O6usxSUX7My9nIyNZiYYqhobqXl7JzcpdNTHqtrcKFhKRcW4ZoZ4/a2uSpqb/z8/YpKGAtLGNPTnzS0d2BgaLf3+eenbfs7PF9fZ96epx3dpqNjauRkK3d3eabmrWIh6anHDGlGC3QhpHWhY7Wg43IfYqMoLA6AAA8U0lEQVR4Ae19Z3vjOpNlk+8EcnY2kBsoy7Za1vXb7bblnHNqh3Z2d7vDzIb//y+2UCBIkAAh8N5n94N08MECQxHUcR0RBAqn3oUofwWBP/7+DmWsEfgr3gHbEAQZa3bQl4OT/yUEQBAQ5C850LgbgyAgyLj7+F/6fiAICPKXHGjcjUEQEGTcffwvfT8QBAT5Sw407sYgyAQTJPkz3j1hRiDI5BJkZzNuz5D+4p8wChfbNxT+KaN4sd++qXhzp9EIBJlYgiSb641u0XggflhvdqYmq3i4PmhNq3iwPmxtFO6sP7Q3Ctc3G5+LIMjEEqTzFGxmTT7dtD/9Hmy3N1oIptOmKzbtT6eDhdZG2Xbwvb3RZvDUaboNEGRiCZKuBx+jJr9o2t+ZC6ZaG0W3wUt7o5fgtr3RWTDX6OtN3yn6GKw3sgoEmVSCJDO7wXHbh0E8WAk+NXZHGjww7j4HN2HLnk8c3gTP3ZZGYfIpWGndm8uOg92Zpi8FgkwqQTrfguDLYZNfNPh6eh4Ea4staZVeB0Gvbccs2+4FwXXjD7v9/rLFtSA4b2mUHC4Fwbem5w4IMqkESQ+CIPjc5Bd2Bww7l2T0o2XPJzolo19tjX6R0Wlbox9kdNn2O30mo4MmVoEgE0qQePhKfrHf5Bd2gsTL82R01O4JEvd/ktFqy95SvEpGP/vtrLIjMppfbmeU7pPRa9OIGQgyWQTpJ5Esd+fkFsHs8E5udpxOFSujDWG09tDOaFsY9Rb9jDr57S1SDysItnOjyH17yuiBelhBsNHOaPhFGJ0ro6Q6kQKCTBZB4qf1OS57N8ItguM93jo4uHa8jcRflZH4WadHiDLacBgl35XRIxt9yo3Wz11G5+sH8vY+sdGjNJpb/+4y2jjIjcQDhB5Wyuirg1bJtTI6ZqMbZfRUNQJBJowgA/EWYZSlj/Y+ldwbL38wLGjH2g/XnGG8/GIz6p25hqbi7hk/OeqWL85u084PfnLUjT44jcKP9G5ulsvaIBgIMlkECeNoYctwi6ND99twHG2Il49qeVwcZXQiXj6q5WbbbRRG2/LRppv9PHF3scJoUT6ldKP5jVFGh/KBoxttLdSNQJAJI0gYdmbWdZ+g14OXeORrd2cgBr308iEc+YKfLu/pFlS/3BlttFN/xu0tjzYK68+4g8FIoyx+qT2u1meMETAQZOIIEmbZm94lWRn1U8v9rCT9rXdJts7rP7W2PlrSeZrVKLL7reN4lVAXSDrfdjWj2Scfozg61x+MS79Tj5bowbiitbT0lpk/FCDI5BGEulnbZednfWj8aipXrX5Gi/IVXbjU/oWv0WbZ+Tl6GNG9Uu1FWufncdPTqHMhhmtlWR3R+1MNhZ1h+TT9uW3jPAgygQQJw7uyR3J+X7jLiMqdmLuT5et9dTC02fJuStkEn+88jfp3Yu5Olqm75mtXjvTvvyqb4JevUXh/Xhh9sBqBIJNIkLj7vvAL7+A+ER2lSnNwX8VpaSMpnyD+kV8UHaXKo0dXSbbJE37SzD/yi4IvVXlvHV4DQSaRIClP+EnP2KqNa9Y9vNjOTpQr0QRjY3BfcbqsZFfle/CSb+QXR0fljfWuzPeCWhtyM5nRXndOPI3igfbmsmF7rQdBJpEgEfewVvb4Xd03uC/iHtbWHr+rf/V9B+Ee1u4ez1b7Rn51uIf1ZY/f1X2j6zvcw1raExE03pFf6bk4e22P39U/2N52QJAJJEi8I97Rjw7vFoRj7Hn6OkdHPW7eXYvuWWNwX+3XPRFzDatXdzwlsu/5u56J1+2fJ3dXYlTgyLOPxcGX76/veFTAN/KrI8ahVxbueFTg5051Ep2/CggygQTh+PNfSSYHcTz7WKKz1DuN0346mAscCygqDOH489sdMuqSK3558HL25IGeN3tdMtq59Y6uF8tbgrkBGcWndKN+HTPuYYlhvCz5RV1B27JHEGQCCULx5/k8c5ZSwIXfytboLMgnP5L085fmBRQVgkRvwev3SNAi6Xyd9Yyupx7W7Fee/Eg631+DN1vPp9KK2KDlLV8+8+QHT4mceRmlC8HSx1Q81zhWwBZdD4JMHkFoDGtfTX7QlMj8nPlyGls6GzfHxTxztPhsGceyGCWPn4rJj2hz1TKOZTHKjleLyY/o4ZNlHMtilK4/F5MfnZnjG4NBYWw+vtK5+WLyozPct41j/fHvf0MZZwTemZ6SXH3MSmdJB1PGOFY2bch8JItv1CdTJe1OGQsospPF8qryxOTwhxbFkvWnLurES7a360bxxVS/bCmLfxiDX8miMUoVD6e6Jc+z5M28l83p8qry9mL66qVRkr1d1e8ljAf/hDLWCFgIEmr+R54S11ZA0K7O3A/jzb2f6c4dZ8akX3RprhocbXRq9mtGG/26NHpQI406P8wZn36if6fQ/E5hZfCYXuhRxg0BG0Hk72fz33j59bj8ZW0+r3Ik7s8/1n+iKydYN+Kbm4qPWk+q78we51suNaQrpMev7vD3eiu8DYKMGyHq3+fPEITmEb9cGL0NqwOVO0nHas3omJWH7bXsKgj8Bpw0+2RzzTrgpJ1iVsXQmHUm0DxV3wOC1B1q3Lb/DEFIxyrwnQksvCl6CdrrbEU0j+g7E1i29DFor7Ml5hHb62yhizVufDC+z58gSLzzHDik1ApHrVVoVs93JrCwJB2r9jpbIlJrtbiEZ4Vk8oJn20yg2x5PEMOjxmzHnyCImEf0nQks3IsjtdrqbPE8YludreRQxK0Y41jFnVgryYWIW2mrs0XTN3qE15i5Br6OQKAFQeK8yEitb5Hatnqc2qlOuj8TrX1uaSR0rIIf9+oi6qLWT3VSxJFaZy2NSCZP6Gypi1hbsOwEQQRu41z8CbI87MqyLCK1gvU435rpWhxH7SqMuryaaj836jqN6KgsfephUR+rn2/6GcUiUitYzW26w2V1L5bP7syyPC/mhVE/8y23kX4dEESAPc7FmyDxxcHsyjyV93IZ6pqoz8+v7J5a10lIL4qHc9JofoXD2nvK6NYxpBoP9na5pfn5qtGeMWNZ+mq8fFs1kldYmZ0zZiw1o+6pMpKLjFfey+90YMxYlkaVGggyzuQQ382bIGEyEKGt9dI7C10TFckyjXgZpffinKdIuuWCRs32Q9c1tBz36xILbHq77DQKrTJCewOXkc4QEET7B41l1Z8gFE9YUUtgOG5GKe7U1BLY6Hnatrpb8zvSHtLVEthoxVDc0QxENY6uaXStWkZqR8TRSbkOMrf1046QrYMgVcDHb6sFQcJQV0tgKCjovOam5makqSWwEQWdm2fV9uhqCWzkox3REYH2etm/MEJOau3QDLoItNfLKBGwyhVAEB26cay3Iki+LkLhkAedVzzGspFlU7KHz3Z50LnlvMou0h7SZISW3nxkekIOtFd3F6xNWWR6Ko3wBgfaF0Y9sQ7Gv4AgBXJjWmlHECG8WPjtfBF0PsKh4vtrMTXBZasIOh9hRBqKYmqCy+4ovcXiWtFisYj8y/W96+2oMKEH42ahC7k0qiOnmYkqCKL+R+P62ZIgYUaBTnl5dr6e656UXJQEcQxf6Sbke8OSIEPfl+Z4uSSId7hY3C9eXtZapmUEQZQ3jOtnW4KI6ChV/JYakttTlr+ieCfRpCSiRWlOolklVUhJRIvinWGRFg4WpWXkFwhSIDemlbYE0XSsAnPVRc1d1aamY+WfRFNER6liWZ+orl39TOeUCaVu8H2Z4LxYuZ1lfWK1heoWCFLiPZ61lgTJOHHN0keRNS2wLUGt+o/ckjpWaz94osJTAyJMLoSOVe+MJypmPbtLUseq98L5Dnx1tnKZvFPOd9Brl2ERBBlPWpTfqiVBIhEddbN9H30XLwieCyg6v+nc5+l7mVnBU2eLdaxIO0JmVvCMrk/PqSXKUXA/Ld4qfhvLHm30DVkmb/d7dM+ZFdplWARBCOexLi0JInSsOEdB9EBB5VYpNdMJhejnnMhR0JmhmqfOltCxOhiQi3NmBU+dLaFjtS+0I9LlOe8MiyL48lhoR6Qis4Kvzlb+cEQ071jTo02oifCIbLOnJj+y5CyYd4RhlTxJHpaWpOIOZVb40dvyGsein+a1j3LyI0k/rvlpmdIYVu+HnPygKZGlJS+drbg7H5zJyQ8xJdJrNY6FJ8iY88MZi9UvnTyvdc5Wi2RTInuGZRzLTLvWeftZTH5QaMf8N3Mi3WwpfXp/VUyDR1fvn7yMvs2XoS/R4s83s49l3l56vnJdhL5Eh6tnppF5ewoZEGRyCRLP/DBnHxa62tBQ52HaOGMwZczOxRt6bEl6sWEYdacMF4w3hhol0uGGcdn+lBFnn2xc6EYD0yj+MVC+rT6T6QeNEll3QR0oPpMfM0br+UEQZHIJkm5YBpwq2j5hYigCZSev5oDTSKOrV0Pbqqa4Y2oPJYevhpxDP6lwz5SCSy5ejaWGdSPtF0CygIbGGkcjQJDJJQgJkFp6UMXPqr1CAqTftN9j+0n1vSRA6ivsXpqSAKmf6GhpwgKkfqKjuhHNI5riXPkJIMjEEiTu3wSXrX09fvSfCSyckOYR97WuUbHfWaGhMe+ZwOJCnbngsam3VJxUr9A84k3T+hUQZGIJkp6Q8L/XgJPmUELi/dU7cCo3TDaXAt+ZwKItMY+41FZnKxm++gq7Fw2F8TKtTTlpIDAIMrEEETpWvjOBhTdxpJbnTGBpJOYRvaOtcjOO1PpdjHMVF3NWOFKrZbSVnEd8aWgJBJlYgoRCZeG2ZR9L6Fj5zgQWrsyRWp4zgYUR58Np28fifDifKi/yxQUbKx2xaLgp4w4IMmkEyVJZ7jl54Puwk287vSpRRhwLv9WN2hhFHAu/O2hnNBChLl8u2hl1RSz82uZ9m9vrhCJjVu9KGVUHuUCQSSPIycY0lysptvB5W24uLLrebU8WciOOYQw++hjF28roF2M8pYyuHC3FV7nR9hQb/brKb2/bZbSojGTU/akyOml8atAK98JIppy+zY02qkYgyIQRJDHVEhiBI9f7cMJpCU2kHo0kHJpHJpyW0DRaNRKC6EbbouNnlp8njidcslimmtZN31+7jDZF9kSzrCxUjCg/yL/+N5QxRuCd5n6ims5oyzCUf/RetDw3NQM2GlBkoVE+hNXuSM0wXa6pJfAFbnecRplIS2iUPREJ2Vyy0CYjdKDP75vGWWyTEVqfqbX0x7/97R9QxhiBOkFI+EBXS2BfzBMWmk5U7KmqJbDRSMUdmZaw6uyUsNDRVxLNxRGlJawWFT5Z3I1RsWgPjdaO4LSE1ZYs2hHIUTh5OQojXhdRugYHnRtOV9sRLVY7Pxx0XjvH2IwOWVu0aIqDzo2zajs40L4wIWXSInyydqK+yYH2mtFqET6pn1Wrd4bVB+ONRTsCBJk8gsh1EcqbKM1rpdddc6JiM9X7MWt50HlxtKGS6v2YXh503nBusZsC7VmSlO+Qen+1Tk9xXqVCgfaF2gQtZAm9jCjQvtBwydfBVC5KGyDIBBIkTO7Lnv63u7pPNGzHd3IMS/jt092InpK6RnzHqu/s62/+Rm9sIP6c+RuVIhCnvkbhHau+c2u397YfChBkEgkSaioL/sF9mspCY3CfIkbxSdFRqvgneBIprvJiZt4sLl2rUPClKt4aECEFX6pin5UEQSaRIBlFR6nSNIdccz/SsWKVBWn2sym4r24VU3SUKt6RXxwdlVu9OsTbK43F/Z+qoRaRX3H5ZrVkXWoIgkwiQaSOVY/V3nrbznHX0glzHSspETft1cenUWWpYyUETALv6Ppcx0oa+epsURJRUeTt+UZ+Zdv8tvOF/1p1tkCQSSQI97B6UzM8iOPbx+IeVu9lZk74oW8fS/awPsyQWgK9BXtGfkkdq8sZnt3w7WPJHtbcDM9u+PaxZA/rYIZHBax9LBBkAgnCOlbz11HGgzieCyiSGYqOohwFWfqZfqVv/GRJWceKJj+yzley9tTZYh2r3a+djKdELMsey6daWYtDSnPw5SnNOLPC7ozthbs8W9VoeUtAw3hZdE3qvVadLRBkAglCi/Wk4k4YXa0Gnkk0hY7VulDcCSMR2mGsbFU+V/kUOlbHnKOAMyv4JdEUSURljoLogrSH/KLrRRLRR1bb7ohYAT+dLSGTt8raEaw9ZFv2CIJMIEGoh/U7n/xIKbTDtoDCHMWlHtZbKl9X0vDUmqjcNKL487M8RwGFdlij6y1Gt4EKfcmyM2t0vWlEy1tO88mPLH2zZrG2GE0Ft335NpWkv60rGEGQySNIsnhUThnH0dO6ITkShsPKg4A2koejMm9UHH3bt0hmGUbxzNFGEVtC8SDHA9NJh/XW48HxuWa0cWSRHDGNuvuUlje/6TiaPjIls+KBIQnUX3/qKCNKx3BkCb4EQSaPIPFMJYyvc2Hmie3f1l05ntFlesLOxaBOoTD+UHfleFiJ/UtnTKPkgyF4MqgZmQO92anhyoMLfQQgHdZvhQbUXow44mVdEChMB6YRZtLHnR9GsCL5dVz8arKTV7fErmxxzXhdqBmZL8H06m+opNSMzJaS4aypM1c9rXYNcf+DXfN1oXpDFqPulqkzN6olhJqMPT9sBGFauP6QTk/TIu1mM5on8Z8rV5dJv/0JlRSaJ2m7gpceINfWdwx1I02f6GKNO0Wa/vOu/fQW7zmOq12F3uI9x3E1I5on8RzH1Yyiy8B3HLe0onmSL+aLSXm8oQaCgCCGa/A8ie8Eu7LmSJRGhUJ1Vu2T50n8xnFLy3iZJi3aytfxPInZMSuv2lADQUAQwzU438evBiEc4+x8B+f78J1gVxfhfB++E+yF0QbNys95xroURjRPYh38VSc0fIIgIIjhGiLfR6MQjnF2voN1eryDGHMj1umZbylfJ/J9kHxd9QW76bbUfpYBay1fh5f0cafHuxYv6Vkky92MiPjrLd7l265gxn6Sn3S/LHR6gpN2RiGJGpJ8nTJyPRXKlhKh0xOc+xjRCl5Z7lMO2/3qZaRIJT7xBBl3iuj/bWc9uT77yOUzRxYGB5/l5tmC47c6mVZGcgnHujI6d7SVnJy9yZak2MKxMvruMrqayo2EJCQFo+RGU9/qM43aRZLF3Oj3Lw7YfVRGT8akoWalV0EQECT3h/jBonciPHHTQZBYBveyy+p/HhddRkOb3gn16pzqV4NyFZXe0s2Jq6VlSUHdQNTfXzuMdH7gCTLu/GjRxUo6T3IJhu5OJPTh6mKRdMk37lvpNsHaVB6AVfG1csOiQkJ9ul8yT1p5WrUWc5xupR0yUgFY1XOLrTi6fq6Z0KYKwCpOa67gCTLuDGn+35tHos1PNW+yCX3U7DhOt2L2XEZt1c4tNqMLMRCgl9HaQ2FnWH/GjdYeohyhc3ozVKeEt9Vp9+KuLBUQBATR3CKLT7mvrlzqsut6b84Ns0R28JURJ7zVLmqtZtmUpkJCI7BDPZbKakIRkzVNLy/tobqml5f2UHEDIAgIUjgDVSr9GFq05PVTSxJsPLDEDJnNE97qV7XVKeT2p6JU8MVTeyiONG3SJU/tIbmAJW9rzVN7SN0yCAKCKF+Qn3e0MCovU76KQOGdXHou7F68je7FhJ8st/5GYsJPljlvcZ/7K2UTHHgbSThAEBCkSpB0rnAm6yLt6tn5llxFzoaPXg8dYafp9Kz6reAVRqVOz/OO71AUBV+q0jbyCwQBQXInlx/xoNTpsS7Srpydb3B0VO6Cnit4qTen6fQ0pkAzWtN0evzzYyWaknvLyC8QBASpOKHU6end8Bu0bwq0XKdHGtlW8FaayDdEkkQqNyzR5Rv5JZIkCiNW9/ngGS6Wcd6f4CcPYu95DAZot/vH3/8RZZwRaDEPwm7BOj0k9PFVeJNvblpWQiS9XhZmP/LsY3F0VO8sWxBpoVY1n3RVOUli7yURKiSBb+RXhxPrfIhPxJSIt3ydvI0//v5fUcYZgZYEiQcUHUWTHzFPiXguoIi75HnPJ2T0cCxSoDlnFpX7xyJJ4vvrKGZhdl/5OpEkkbSH4pQzlhjLHtXFq59CBkwkXkiX54ghxrLH6snVrXj4zyhjjUBLgoj488sdMfnBCWb8FAqFTo/MccPC7G9ePZ9sW2kPsTC7n3yd0OmR2kMszO4XXS+Wt0jtIZ4SaRVdjxRs9JMy1sVFkNjsDHXm1r7lkx80JTJrGceyGV32ngqj6y3bOJbZEo1hKe2hODqZ/1n95eYti9FZ8KaiWKKr53nLOJZpRD0spT1EUyKrW5boetMovx0QZKzZQV/OQZD4YbreGYqHeyy+Jt2jc7FnSI7EM0bmv3iwx+JrudFwz5AciYcbhgt2L0/KJ026fGlIjoQD0yi8pT5Z7rth2r00vkC4bMYex7fUJyuMwtuN+rcOd0yj/HwQZIIJkj6ZErbdvu49SWgoAqXf9/Uz2I+6lbyDSWwabZhv7t2ufp0kHigXVp/Z9KOqFp/dSuhLkgyKI3klu3o0nio7FaPYNEo2V+sqR+q6IMgEE6Rz8KXJL5R/mJ/RZe/CeBoUv8/m+byHulPGo2jk1CBNCS7qHOIrjWzpo2VKZZQR6bE0LaYHQSaXIEIwwTe3QOH4QljaT/e2MKEpQRKW/t1u+oGsacDKd0qlbIsGrHynVEoj0mNpEiwCQSaXIGLAquWsGatLtdekElk4zI5Z6aDWGonXBZ+MZ5X11HKnGLDyD1vJ7YRufdOUCggyuQQR8VMrbftYIn6qtSZV9IsyE5h9rNKvbbXoh/eUSmkudOt9p1QKK9ZjaZhSAUEmliAyfqplZFK8I0LUW2tS0ZRg0FaTiuOnfpQDXYU/uyqsx+I3pVJehvVYGqZUQJCJI0icl86C+OqXkdouHcZSUyd1OM/ZXEdtW04td6mTUo6fWm9pxPFTR6m6SHlZS02dlHEaxdVEbVtOLXepkzJOo3gTKqvyDKqBIJNGkJ2ZriwJayDMD/tyczioOEZ1Y2e4LM/KOJPs1kVuNHAZ9WeUEfWwgmB2s5VRwhHqS4uhbNivpYR6WKKPpYyMfAz611LfKZELYK7jvKWKEQgiEB3nUpsojPsvryvvRXmWiW5Xnnlr93jT9UJ8tmU1siXUKHww/qGMOPQ2yFt6/XTlaCn+uJK3xKG3wZa8vdfVE4dR8tlqtHVjzGkWN0fPhq/zWxIIKTrxKlva+rmgtwSCjDM5xHerEYSGXKcqq87z779/YUw5aM4Ux2+VBeS50fGh0yj5XSabzi3o45M7ljGxKKtQsO+Vq6UwsyiriJhLt9G5CCOul+fq5DwIUgdo3LbrBKE1eSflWvD821J4u/6zqVFDVUUyw1qh8HanA1JLhkhK0Bu5JNwUSQl6KiObuhvj0xRJCYIPeUY242S1wxRJUYGa6gy8g9T+52O4aRKEYphqum0yj2XpFbZa2q/ptv2k8Hbbifq+tCaSElBq3ZFGdZEUDm/Xr2qr10VSAg9BoFBm+dX+6bsqULNoAk8QDZ6xrFoIQmJvIilzUWR4e+ETDZWYkzIXRnuVAKcGGyGSovdjDgY+8+kkkiKWQ6kiw9ubWlD7SSSFFqUUZZ9T66qDjZ/RNiWPLopMrVs5GQQp0BnTio0g1Pk5LLpZva++MmrRRdnN+uxr1BmWWnRvfipCIYm90RKnvJy5lR1Ld067pRbdy6jenzJL+weqoeCDxQgEKeAZ04qdIGFS+vqVhzac9Ke01D6Y9jbqlG674PP84Kai0m2/e88V3kvRbfGPfPI3KsV7P94r2pSfIMiY8qL4WnaCZKW6lH82wlwwgS/dFNxXulZe42xV+d3M+RJEd0szJN9oQ+6Ih2VvzrLQy24Vd8venHWh14wcbi7wRGXMELATRERHqeKdjVBER6ninY1QREep4h35xdFRuZV35JcIvlTFO/IrLcXrAptgkU5VdXF8jhMCdoJIdam9N56oOBkxWqt+e6W61MFv/k1tWkChTlafGfew1j/zqIBv5BdHRwXHT/xI8I384mxVwdET5+Txjfzq8Njc4xO/4FsW04Mg40QG23exEkTEnwdLv9N7HsTxXEAh4s+DtbfsflG8v3hqUiUPNI1Oerj3PCXiGV2fDIlONPlxL0RSfKPrOR8oTX7czwhKegoWxTuCGbc790Px0mMue0QsFsEy3sVKEKHfyZMf6Q692K6OnJrgx4HQ7+RsCGlIL7aeup+ihyWyIfTT+KXnq0nV+UaB+BtkxCIpr8MRk5jyYSXE68TkR59FUjwFi4Qey+v3TtJnkZQlM9wGT5DxpocZasLelDyqHDKU/2Y2sIRkWHwyOwryyQ/Kf/MaWMaxEpNpFH8+N+ARL9aNt2hSWYw6cyobAuW/eW9b9mgzugz2L3gUgERSfgYWwSKLEeUDVdkQRKzAR2MUAQSZRIJk01vfOsqZo8PVU9Mvtgfyd7n8m11tKW0fmke5+HRrDPQmV4ZRsrnyu5j86AyPzeTNyaKRrjZ5mP9RhL50BvvrxjtSsnihbl/dYDx8X2j7UKzAwb5BcZvR8s+XIq1V2t87ql8VXaxx54cRrCgcKple1OYJsu55X7mZ+kz2qzF7wuhkWzcKz400mOmB8YBItjVtH1pxcd5VLajPdM5YF59cTWstJcn5QJ2sPjuXT3V6Jpt6FEuSnRu8iz4YD4j4kDpy6qKUnmdhptySu/EEGXeGWN9BksrPa2z+Qj/0zGV5VcU4i9HMmrksr3padUu4YDyYNZUOa6cZtxfvbJlTKiONwvfmm/soIzxBxp0f1idI8ZvZVCEdnNZ6CSG9WrfWSwjp1drzdV+7V3q1bpvmg6RUt9svpkc079jz488RhF6tbbNmmo9aqvRqHfhOqRTmQjmiQS+hOMeo0Kt1OwlqcQUxcuc7pVK2iC7WuFPE2sUqHcBaS8TS7rZ6CbFY2m12zKwNFDtZOcJzSqU0Epl3zI5ZcdxeEXOjZsfMfm65FwQBQUpvUDWO9Dgyuv7qsP2TIz08p1SKK3Ckx02//mpcHLdWUqEcMW+RoLaene/kQLIt483dZSKOgSAgiOkjHTGtvOReGmtYRWIVVs8/NJgvwJl3bFMqxuW1HZx5p1EsVDtRr3LmneDcGNDWz7HU4+X/87//B8oYI9Cii9UNEy6piPQIgrd7uZl0+xbPUbuUUUZCplSm2hn1OQbqpTAyho5VM/TZ7cv7yWQg2a0y2vExSrJHcXt7Uf6dnEZao+Ef//43lHFGwJ8gyfTR6idRjuQqu9cj3nq8mdIdplZPto9zIxGgRaqLyuiXg1XJ4v4NX/uTNJpVRqeGMnvZXLK5nhs9surEF3mFx5sPjs5Wclg1WpJGn24ufSUlkcQTSTyVEyYbHAjLjq79Oe26XhGSa34IaOdz9dbhtWLSUV/pWti6vTYxdSOE5ZwzVCtZLBc0Fu1QAORMZSZIIWD5BEFAkMIt0uWamgO5lMgiWJxgq3C8o+Z7oiqyCNrOLfZxvGPNaKTMAieFqxmZMgtFG7LC8Y41o9kyZqZ2trkJgoAgpVcknboq1dxomQWKd+R3ltIL14cj34Up3rFc/8eWHjILHO9YNkM1i8xC+W1kjeMdK0aftCRa9bONbRAEBNGdItrkl9ncob58LoIG9ZPq9aqU1dKbn9EFL6XKW1qbsigm1NshNYfhuubrvV9FpKF5arknHczpRqdxPY6rPNWsgSAgSMUr0rhUMbjRYxorZ9U2SMqqcMFnPaaxdl5lk6SsCqMVWjJSOdi0kaVvhTDklh5p2GQg9lNy20IYcndU7692IRAEBKm6RERriPJyYJH5qJ6stjqU0zkv+95GKeV0zsvRyD6Zail7KHx9NfUjFcVhzUh5YGrtp2VViLq27RMEAUGqfiGio/Iya2YjrJ5bbInoqLx46yVwdFRu5B/5pStHeEd+dX6ru2sd+QWCgCCFm4tKvKyN9fpmI4xFdJQqv7XFHJVL1zfkhJ808478ksoR0shzMT0ljtNed1pGfoEgIEjFcaUOztILT+EdeL7OcnRUsHbKcw7mqotKA8UGK0cEvQ9CmME7uj7jvDrBLXu8b+QXK0dQfCO/4DdlIyzuq1oBQUCQikewDs7z9B0LXPtqUonMhcH8xj0LXHvqJYQcHbV1fh8LY4teQuW21IZQjgh2v98nv+j9pedOiqBsQlreQgl8vkbZlHh/sSymL840KyAICKJ7hUjzHMwtp30SuKaYd2M5rH5uUY9Det4c0ORH3PlOMe8WvYTiVK0S04Dy/kxEAtdiSsRYDqudqVUpzTPLLEiBa8800ZTmmdKSiJaEwLW57FG7vlEFQUAQ3Slosd6Xz1JmQWT3MEUW9JNVnYRMVYaRiKSs/MRCs8VeL88w0iEpKz+xUCFkmmcY6QwOgkevYSyxvOVFTn6ky3OBt5Ikfz0QZJIJYgYUdvZ+FpMfWXy65TWO1fkwf6XezGlKZNaUl1JU0j47v7aKDCM0JTLr1V3qTL0WoS8kZfXFaxyr83u2mPygKZElX1FIEGTcucHfT/PJejX7aKjndD8vly/mlBLETA2YfX6o/27vfJbSV3x96jEZiihh+nmxHh3Y/zyjt7SxYSzQSr8a2QzjJyl9Jb9JdL1gGn0zSBN/PdSmWaKTc9Po+7WxLwcLT5BxZ0mdFeU2KZsbYrn9rOL9ptvE4fO30rHlxepGlUvwKcmqIZZLqzvKW6G5PNMo+/RDc2w+ebRRemwM/hpGxoOzs944+AuCTC5B6H2j0S90363USRzEU2FXM8sWfRV2NaPk0FdhVzeaWbJlMdDOsFRJe+jG5Kc8EQSZXILQ4Gx7yR0SB1lxrvWwOGBI09+v3isw1AVI1td3xFiZUDTj12Ct5Vphmkc8p9zq5sOSrwqCTCxBePq73aQAuYyY/jYEFEsHtddI1tdzxFizF9PfniPGpZVInGDJYlCeYKuJ6JqmEWMQZGIJwtPf7SYF6FXhiibo2kruZJuUh6St5A5Pf/uNGJdOnwjtIb8R49KIo2uaRoxBkIklCIuDtJXc4elv7/RSuRN2PtIEdlstRNYe8g+XlE2l36mlpcPK63/JhIaaSJwQ9BbtfSwQZNIIkqSydBJeF759n2/b/SP3KWWUpryeauPOxyjOT0ojDrc6b2d0z5FT39oZ3c2RrwefWxpxlqkfdiMQZMIIEi8uTHM5eeLVGJdXcnPj2hj8LH9w401l9I1XY8wVRg7JnfhQGZ1zprf17bylDUPiXWvpQRktUKQLxaLkRtcby+VJ9Vp8oYw2eB3vUWHk0C6JZxau5Q1dc/zy6km+tVAxAkEmjCAJ50ITvlctu9+aBjrJHZNDfgZULWjry5PL6EELMtdMl347jOKZMgG0ZhOs/aizQtuOh3P6uUV97cxF+kG58KWwoErvV0V7CASZMILQjNxpsZCvdIwjfbJZ8728atMGCYLHzfpEXsUyyX4Uq//KllavRhh95OdNaSBqNyduo/SpWDJYGr6fdhrF6dea2IQwXdkoUgvxlwFBJo0gFNNq6F/18gDAin9XNkxtkKA3Uv2Ac6GVDsu127A+D19phzZELrRaueyONKqITbA5xSTXL13bropNsJGISa4UEGTiCFLXBqGVHEUAYMU3qhudijaIh/aVME95WUnp7q/fPcQZUl5WUhqN1L7ilsLqg/GLj/YVRVZWnqYqJln75iDIBBKEZD5khnTphAejta+Ex1AgrNaPWZ+p/dRqTqVV5bIS5ezHFyroVzvFrFKQJE1nqOKhfSUuUVXaeixiks3La3vkshLVEif+1Y6KKggyiQQJw/tz5RXB3L3vtMG9mDCQZT3yNpoufqT3U+dYsuaa91fF28snL+0rYRttFgReHdmRU41FF8WLyM8dS58MBJlMgvDSVenr/olARNLzvPguB6f+nJi7k8V/OTjP3Umjeac0sPJz8SmSnufFM7c6GcmV8WxmnZX849/+AWWcEXinu1BZ18RB/CV3NHGQxuC+som8JqKjVPFOttbRRIK9I7807SH/ZGsy2Yi8QSMkn77CH/+CMtYI2AmSi4Msce/HV3InFweRRsaqC4MZcgdHR1H4B7fkG/mVaw9JI9/Ir7hLC85VS35rhekWpfbQGvfoLJFfycxu8B9QxhgBO0FkD2v/8Ez4rW8fi8VBgqNNnt3w7WNR7lsqj4u/xeyGbx9L9rBWr3h2w7ePJbWHfm5/E1Pwr57J1mQPa376XLyJWPpYSMFGuIx1sRNEiIOsnSVptDFPFc8FFEIcpPcrTlkbxFdyJ50jeD+EabQtQr88o+tZe+hyJ40WxZSIZx+LtYf2llMhNuEdXS9y3wY0jCfEJmzR9SAIwTLWxUoQIQ4iE38IbZDgo9fgqxAHWWG9aKEN0riAotrViikzm0z8wXlEXrxaErlvafKDIlI4j8itn1H/JpCJP1IRK+AZXU/aQ1LCnmMFTKE8EGSs2UFfzkoQij+fy3UWSBvE1seyDOJSD0sl/hBy6avmKeaekOLPVeIPmhJZsvSxbEYLwdGDZAVNicxa+lg2o2kKfVFGC7uvlZBDZq3FiBYQq8kPihVY+WKIuIAgE0mQeF3L4RFtPxrqIeFh9UEgtpKDszLxR7T4yVQP2ewbVtneS5n4g0I7DPWQ+MEMCE5vP5STH9HDkSEtER+aAcHp6WWZ+KMzc2xIS8QPZkBwejbXLyY/OoP9p2Ij/yYgyEQSZLkSmpgODCGf7sGMEXLb3dS9Jx0cGmccGNcJdzb1HAXZsmGUzBmCQHWjrmGU7ZmU7i/qwihZf7N+e+mlKUcUburZEJLQMAJBJpIgYbW3Edd9iXoeljfjUUaLtnXnI4ySh55l9qFmVN2kZ9lw6c0MdKmeFVc3aTx3MHtmvszUzqptUlMzYkwMZXwRsL6DGD2h2g4a2/F7M9btaOjY881YsxIvNvqDSTvUXKWh47brzul9f8FbQl5rGQQZX2rIb/anCJI8Bs/eER7KnWjouO26c3Lb9cBXQl61Q9Erc39GEOg28I8ZKNoCQUCQwhmKSrZIE8veYSG5mRg6tnXMiqvaKmLo2D8sJL+CGDoOLB0zWwPFPjF03F4QCF2sceeHfZi3cBt7hdOc+YaFqEtwmjPfsJDC6Cv9A7zDQnIrli7xTdOjWuLEQEfGO4Y63PSJJ8i4M+TPdLESMRVtmbJo8iLez5GM8y1FFzmS0T/0Vt4ARzJawkKctxcJ6RLfND3llUAQEKTwhjiS5e6QQ/dO7vLtxJzeKGwoZ05uNMNLyTdaGd0v82KM88KovK5ZUy3d91mF5Ksycq4xKYwSSgwUBL+9jLS2QRAQRLlDsrF3+0GUU6lGcnzKW7d73+ujwMqCPpNrZcQyVsEnZeQUSTm5zFuSofCr0ujD3ldXS9vKaI7/ZzfK6LN2O/Vqsnh7Kb/THocTPyujjy7Sa1cBQUAQ5Q7xskgWaJZLM2hDmdDsQre6qluZz5kTjaVRuMPJAtW5xefBhYMgYV9fJlzYBPvm7KTWUqgvEy6Njo0ZQd1Gq4MgJWjjWWvxDiJT+NVgkJGGmsvUqrEM061avX6XWdxq55abFuUSyrI5ysgi6SUjDcsLGzUZplu9PdJmcPbLtIuAIFXoxm+rBUFoVkKE6VbK/mhthrRbV2A7ziMNNUerV+vKJTLLZv2s2jaH6VZub3W0NkNduYREtrbNGfVaS8UmCFLBeww3WhGkplxCeoZlpGHhM0alqlwSjBbZEleoKpcEvZfY40c9jhb4BV39n2idiXE3xo6qcglp09u0GQyrfAcIorAe1892BCFpkEWWp2Y4boosm03+k+/XFdjkOpMRBuJwdFFKk64UWTZHGHZm5GCAuL9Rvb/iUrzoJf8He4lsFZaYKMxhG9+PtgQJ754KMKbuSk9x1vr3pXTJi69RqKkI3foa9e9Pitub8zUi1hdG695G/I3xBCmQG9NKa4KIhbV5aUoqY5JFky7xT0MuEjvlxT/jiCZd4h/5Ff1SDbWN/AJBCuTGtNKWIBwdlWPRlFTGIEg8eC3hO/F4LxBX4OgoZeabu5zzxikjYyGVcWP5DlpYW5SvZqB8kxntB0EK4Ma00pYgnNgpWFrnZRC+gkAcHRWsrfO8uK8gEEdHBb115pZvut1U9rDW+V3dN90u542jXCMUrkgKDZ78lawBQcaUF8XXaksQ7iytLNyfCJEp3+A+jo56Pb9n5ZLV0DXdV/5ac3TU7td7HhXwjfxinbfZp+hQhIv5ptvlvHFLv6MLoVzSLt0uCFJ40phWWhJECKUFQpiap0Q8BYHiAf2gC20GVi7xFARinTchTM3KJZ7R9XFI4kFCmDqLXyh2xLLssSRgWRPBl0KbQWY5+d7mEQKCjCkviq/VkiC0WG/tLcv61PvuPM16LqBIKc/4FM+YJJ1vu4FlZWvprEWNlHR7v1ibgXXZ/aLrM+phnfLkB0+J+EXXZ4u94JYnPzjLSatljyBI4UljWnERxFiLTnPp+yvFPHO0efPJXEBhM5p7nVZ5P6LDx5uCBEXFYtS5nGWRLXFOdHH0vpL4jA2NZeW0lvD0y7lqqTPct41jmXfcOVv7psToaUpkdsY8xdyT3zoIMqa8KL6WgyDJ1XbdMeKZl1wvSzhI2v+1WT8jWTTlfgYvM2W3JYvPDJ2SZNMQFImXXy7K8STq/JzUW4ofNozJ9Z1f1CdTJct+mJe9MI3CMy0ghVKjGGdQPs9646oNEKTwpDGtOAgSvZhjRzuJ7ipxZohWdabMsaPRRh8PSjLkvrdTeUBYWkqfTDmHfqwvTrEZfTflHPrVKBbzO6ULjaMRIMiY8qL4Wg6CJKvPngNO6veUPrNPK2ZnSDturab7s66YeatN2DlYGupstZ9V2xtd9h7aG50Gi8bDSl4YBCk8aUwrzQQR767bDX5Rc7tyU0gztJVzCMXko+eAU9mSkGb4Zjx3yuPWWtx9Hzy1NiJV3yZ5YqQ/GOPMB/zVmgkipBn8Bpw0XxTSDH4DTroRpUDwG3DSjGhorL3Olph8NDtm2lVtVTE0ZnbM8jORQGes0+f8y780E0QkmfKPtsr9RUgz+EdbKSNaWWtRoLY5a7lPTD5ueWb5KKxEpJZtlKo4wVYRkVpLhw0dM6RgG+f8a/TdGgmSbZLKguekXuFWyYMIQfHM8qGsZJIp32ir3EpGanlHW0mreOcn3V67aCuyFElImnS2kMRz0pJ4xnmJPpJbBFP3alu5s/VTnRRxLPyvlkYcC38bqYtYW1A71Ukdzqi719JoWnyng466iLqo9VOdlF7RnHywn6rt6skgyIQRpDvsctkJqYdFfaz+jtwemgkFSk/pzsiTugnHwt90lZGZUKA02slb6iZzoqXnQT9vyWmkWso4Fn5rpp0Ry07sPoR5S4Pyboxaf2ZZnpVxLPyXzdxoUDUCQSaLIPHy5e78e1Hmxe9m0Ms3dvcc47Bx98PuChu9Z8WswsilXRLvvFSMAnmF+d31C0cwY//sNW+JZbYKo/2mdwR2/KmtitGW/IK7x8Y0p0aT+OOWPO/5iwAikBvvdz9VMyuAIJNFkDDesYr73HYbXlLZpeLQKu5zuew2sor7zDknN+L4jTnIPlv+ObCEh5TOHiefJZ1KA1Hbv3AOYidfOaS/ahMcH1aNQJAJIwipJYjEndWyNWpJuE0R6PW7iooqXbVSsykCjdT2CS2KQCO1fUKZuLPypUjbx0VfulOLIpCpUgGCTBpBKOJvKAUNC3/y0PYxFYE8tH3CtEtjtXoR4e2jShoKGV2teGj7hIYikI+2j6EI9GyqVIAgk0cQEvf5qHVJzF9NqwtT4k7ZWWfX9dP2oZh5vR/jp+1TVwTy0vYho4oikJ+2T+1pSjmkja8OgkwgQah3sV0sIp89Gf2jLt0mWuSFroIgS0WkuuFRtR3RIatGC6O1IlK9do6xGV2IpOpcet9GdOQK485QzGfI8qTC24ujDZXOgAfz2Oq3zQgEmUiCJKXKgv/Ec9wtCfJQfZVtcD/aHcdi7o6LtwYErdYqfX3b/FVvaC0tff3aOx6rU4pznduMQJCJJIiUZpB+2zSHbLihiI5SxVfOIZTSDNLMO/Irl2ZgKzMk37gxuUMEX6riHfmViHiCvFiXGoIgE0kQTceK5pAbPK6+m6UZcmc68n2CaDpWwapjAqTSGEsz5C35yjmELM2QG3kn8uG8WLmRNfILBJlEgrA0Ay0JnxK/ubOeCyjiZe5hnf4QExW+uZriHaGOEnzgUQH/yC/uYV1+5okK38gvEXxJAcBPrD3kG/mVcQ/r4CtlPQxsWaxDEGQSCdIR0VGkh3t/LaZEPBdQUB5lEs05j6Qi0Edbh73yGOANkmYIAtLDvd8WPj/lNx6QbRNxZ59SqQj04mkkMo8u/U7vOUnCrd/tJYc0MkfDePcPQhHIXCsZgiDjzg9rNG9njpZNDMmHWNbZcwGFUAo9Jm0fmhKh2Y3GBRRVkkQ0b8+TH2mfzD/59bEoTTtr+/RZEchTZ4vStLO2T58VgZ79lj12PlMyRpr86LMi0Iol3AZPkHFnSNVheSse7vZI20fUk/T32peLEVPO0ojGsKZYpoeMnr6sOYOj2IL+CKXQX3JJOCkCzTaubFXny894Ndf2odmN89fAUImonp1vZUfBLTGKCk+J+C17pOUte93ciJ6mluh6EGQCCZJ+nd8uZheiq+fPPq/p6feVQtuHQjtufvh0YtKFlXLGJHpY/eVjlE2vlDMmnYtPH7yMtlfKGZPO8HjP5zslmytPRVqrzmDfIksKgkwgQeINTaYnTIcbPj2f5PpC87l02c9o+lDz7qy7YP3xr+1MTjZ1o/5Cv3aCbTPZ1rR9SHhxwdBjsVglV6S3WJQkWTAj8UGQCSRIv6LtE1akdAp3qVfqRl7jvP//jOhb6HdcVfrRj1TqVaPQ8p1AkAkkSMVHsOFEAAQBQZwOMukHQRAQZNI54Pz+IAgI4nSQST8IgoAgk84B5/cHQUAQp4NM+kEQBASZdA44vz8IAoI4HWTSD4IgIMikc8D5/UEQEMTpIJN+EAQZd4JEKH8Fgc6//w1lnBF4N4XylxD4n//rv6OMMQLvaKUcChAAAg0IgCANwGA3EBAIgCDwAyDgQAAEcYCDQ0AABIEPAAEHAiCIAxwcAgIgCHwACDgQAEEc4OAQEABB4ANAwIEACOIAB4eAAAgCHwACDgRAEAc4OAQEQBD4ABBwIACCOMDBISAAgsAHgIADARDEAQ4OAQEQBD4ABBwIgCAOcHAICIAg8AEg4EAABHGAg0NAAASBDwABBwIgiAMcHAICIAh8AAg4EABBHODgEBAAQeADQMCBAAjiAAeHgAAIAh8AAg4EQBAHODgEBEAQ+AAQcCAAgjjAwSEgAILAB4CAA4F3/4wCBIBAIwLv/gsKEAACjQi8+0cUIAAEGhEY9xSM+H5AAAgAASAABIAAEAACQAAIAAEgAASAABAAAkAACAABIAAEgAAQAAJAAAgAASAABIAAEAACQAAIAAEgAASAABAAAkAACAABIAAEgAAQAAJAAAgAASAABIAAEAACQAAIAAEgAASAABAAAkAACAABIAAEgAAQAAJAAAgAASAABIAAEAACQAAIAAEgAASAABAAAm0Q+AcUIAAEGhF4968oQAAINCKAFGyO9Fs4BARAEPgAEHAgAII4wMEhIACCwAeAgAMBEMQBDg4BARAEPgAEHAiAIA5wcAgIgCDwASDgQAAEcYCDQ0AABIEPAAEHAiCIAxwcAgIgCHwACDgQAEEc4OAQEABB4ANAwIEACOIAB4eAAAgCHwACDgRAEAc4OAQEQBD4ABBwIACCOMDBISAAgsAHgIADARDEAQ4OAQEQBD4ABBwIgCAOcHAICIAg8AEg4EAABHGAg0NAAASBDwABBwIgiAMcHAICIAh8AAg4EABBHODgEBAAQeADQMCBAAjiAAeHgMC7f0IBAkCgEYF3f0MBAkCgEYE22dpwLhAAAkAACAABIAAEgAAQAAJAAAgAASAABIAAEAACQAAIAAEgAASAABAAAkAACAABIAAEgAAQAAJAAAgAASAABIAAEAACQAAIAAEgAASAABAAAkAACAABIAAEgAAQAAJAAAgAASAABIAAEAACQAAIAAEgAASAABAAAkAACAABIAAEgAAQAAJAAAgAASAABIDAuCPwjyhAAAg0IvDuP6MAASDQiMC7/4gCBIBAIwJIwYYsY0DAgQAI4gAHh4AACAIfAAIOBEAQBzg4BARAEPgAEHAgAII4wMEhIACCwAeAgAMBEMQBDg4BARAEPgAEHAiAIA5wcAgIgCDwASDgQAAEcYCDQ0AABIEPAAEHAiCIAxwcAgIgCHwACDgQAEEc4OAQEABB4ANAwIEACOIAB4eAAAgCHwACDgRAEAc4OAQEQBD4ABBwIACCOMDBISAAgsAHgIADARDEAQ4OAQEQBD4ABBwIgCAOcHAICIAg8AEg4EAABHGAg0NAAASBDwABBwIgiAMcHAICIAh8AAg4EHj3n1CAABBoRODd31CAABBoRGDcUzDi+wEBIAAEgAAQAAJAAAgAASAABIAAEAACQAAIAAEgAASAABAAAkAACAABIAAEgAAQAAJAAAgAASAABIAAEAACQAAIAAEgAASAABAAAkAACAABIAAEgAAQAAJAAAgAASAABIAAEAACQAAIAAEgAASAABAAAkAACAABIAAEgAAQAAJAAAgAASAABIAAEAACQAAIAAEgAASAABAAAv/PEfi/kxj5gGSHxHIAAAAASUVORK5CYII="
                      />
                    </defs>
                  </svg>
                }
              />
              <Input
                style={{ width: "100%", marginTop: 18 }}
                value={email}
                onChange={setEmail}
                placeholder="Enter Email"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="15"
                    viewBox="0 0 23 15"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M2.95 2H20.05C20.5747 2 21 2.2736 21 2.61111V12.3889C21 12.7264 20.5747 13 20.05 13H2.95C2.42533 13 2 12.7264 2 12.3889V2.61111C2 2.2736 2.42533 2 2.95 2ZM19.1 4.58989L11.5684 8.92878L3.9 4.57644V11.7778H19.1V4.58989ZM11.558 7.29344L4.38545 3.22222H18.6269L11.558 7.29344Z"
                      fill="black"
                    />
                  </svg>
                }
              />
            </div>
            <div className={styles["button-container"]}>
              <button
                disabled={
                  firstName === "" ||
                  lastName === "" ||
                  phoneNumber === "" ||
                  email === ""
                }
                className={styles.button}
                onClick={async () => {
                  setLoading(true)
                  await postCreateAccount({
                    phoneNumber,
                    email,
                    firstName,
                    lastName,
                  });
                  setLoading(false);
                  nextStep(phoneNumber);
                }}
              >
                CREATE
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
