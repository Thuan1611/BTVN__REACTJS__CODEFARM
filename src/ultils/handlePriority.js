export const handleCompleted = (item) => {
    const today = Date.now();
    const dueDate = new Date(item?.dueDate);
    const isCheckCompleted = !item?.completed && today > dueDate;
    if (item?.completed) return "Hoàn thành";
    if (isCheckCompleted) return "Quá Hạn";
    return "Chưa hoàn thành ";
  };

  //CheckPriority
export const handlePriority = (priority) => {
    if (Number(priority) === 1) return "Thấp";
    if (Number(priority) === 2) return "Bình thường";
    return "Khẩn cấp";
  };