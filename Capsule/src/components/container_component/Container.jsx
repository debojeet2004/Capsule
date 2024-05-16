function Container({children, classes}) {
    return  <div className={`container max-w-[90rem] ${classes} mx-auto`}>{children}</div>
    
}

export default Container